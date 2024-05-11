export SkyModel

abstract type AbstractSkyModel end

struct SkyModel{F,P,G<:AbstractDomain, A<:FourierTransform, M} <: AbstractSkyModel
    f::F
    prior::P
    grid::G
    algorithm::A
    metadata::M
end

function Base.show(io::IO, mime::MIME"text/plain", m::AbstractSkyModel)
    T = typeof(m)
    ST = split(split(" $T", '{')[1], ".")[end]
    printstyled(io, ST; bold=true, color=:blue)
    println(io)
    println(io, "  with map: $(m.f)")
    GT = typeof(m.grid)
    SGT = split("$GT", '{')[1]
    print(io, "   on grid: $SGT")
end

function SkyModel(f, prior, grid::AbstractRectiGrid; algorithm = NFFTAlg(), metadata=nothing)
    return SkyModel(f, prior, grid, algorithm, metadata)
end

function VLBISkyModels.FourierDualDomain(grid::AbstractRectiGrid, array::AbstractArrayConfiguration, alg::FourierTransform; executor=Serial())
    return FourierDualDomain(grid, domain(array; executor), alg)
end

struct ObservedSkyModel{F, G<:VLBISkyModels.AbstractFourierDualDomain, M} <: AbstractSkyModel
    f::F
    grid::G
    metadata::M
end

function domain(m::AbstractSkyModel)
    return getfield(m, :grid)
end
function ObservedSkyModel(m::SkyModel, arr::AbstractArrayConfiguration)
    return ObservedSkyModel(m.f, FourierDualDomain(m.grid, arr, m.algorithm), m.metadata)
end

function set_array(m::AbstractSkyModel, array::AbstractArrayConfiguration)
    return ObservedSkyModel(m, array), m.prior
end


function idealvisibilities(m::AbstractSkyModel, x)
    skym = skymodel(m, x.sky)
    return visibilitymap(skym, domain(m))
end

function skymodel(m::AbstractSkyModel, x)
    return m.f(x, m.metadata)
end


Base.@kwdef struct FixedSkyModel{M<:AbstractModel, MI, MV, G} <: AbstractSkyModel
    model::M
    grid::G
    algorithm::FourierTransform = NFFTAlg()
end

function ObservedSkyModel(m::FixedSkyModel, arr::AbstractArrayConfiguration)
    gfour = FourierDualDomain(m.grid, arr, m.algorithm)
    img = intensitymap(model, gfour)
    vis = visibilitymap(model, grid)
    return ObservedSkyModel(m, m.grid, (;img, vis))
end

function idealvisibilities(m::ObservedSkyModel{<:FixedSkyModel}, x)
    return m.metadata.vis
end

function skymodel(m::ObservedSkyModel{<:FixedSkyModel}, x)
    return m.f.model
end
