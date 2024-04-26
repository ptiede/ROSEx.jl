@inline function ComradeBase.visibilities(m::M, p::EHTArrayConfiguration) where {M <: AbstractModel}
    return _visibilitymap(visanalytic(M), m, p[:U], p[:V], p[:T], p[:F])
end

@inline function ComradeBase.visibilitymap(m::M, p::ClosureConfig) where {M <: AbstractModel}
    return visibilitymap(m, arrayconfig(p.ac))
end


@inline function ComradeBase.amplitudes(m::AbstractModel, p::EHTArrayConfiguration)
    return amplitudes(m, (U = p[:U], V = p[:V], T=p[:T], F=p[:F]))
end


"""
    closure_phases(m::AbstractModel, ac::ClosureConfig)

Computes the closure phases of the model `m` using the array configuration `ac`.

# Notes
This is faster than the `closure_phases(m, u1, v1, ...)` method since it only
computes as many visibilities as required thanks to the closure design matrix formalism
from Blackburn et al.[^1]

[^1]: Blackburn L., et al "Closure Statistics in Interferometric Data" ApJ 2020
"""
function ComradeBase.closure_phases(m::AbstractModel, ac::ClosureConfig)
    vis = visibilities(m, arrayconfig(ac.ac))
    return ac.designmat*angle.(vis)
end

"""
    logclosure_amplitudes(m::AbstractModel, ac::ClosureConfig)

Computes the log closure amplitudes of the model `m` using the array configuration `ac`.

# Notes
This is faster than the `logclosure_amplitudes(m, u1, v1, ...)` method since it only
computes as many visibilities as required thanks to the closure design matrix formalism
from Blackburn et al.[^1]

[^1]: Blackburn L., et al "Closure Statistics in Interferometric Data" ApJ 2020
"""
function ComradeBase.logclosure_amplitudes(m::AbstractModel, ac::ClosureConfig)
    vis = visibilities(m, arrayconfig(ac.ac))
    return ac.designmat*log.(abs.(vis))
end
