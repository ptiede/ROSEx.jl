module ComradeMakieExt

using Makie
using Comrade
using Printf
using Measurements

import Comrade: plotfields, axisfields, plotcaltable, plotaxis, getbaselineind, getobsdatafield, frequencylabel
import Comrade: baselineplot, baselineplot!

"""
    baselineplot(data, bl, fieldx, fieldy; kwargs...)

Plots the baseline `bl` with `fieldx` on the x axis and 
`fieldy` on the y axis.

If `bl` is a `Colon`, all baselines are plotted.

`field` is expected to be a function of a datum with properties
    - `baseline` : The baseline data, e.g., Ti, U, V, Fr, sites, etc
    - `measurement` : The measurement data, i.e. what is `measure`
    - `noise` : The noise data, i.e. what is `noise`
"""
Makie.@recipe(BaselinePlot, data, bl, fieldx, fieldy) do scene
    Makie.Attributes(;
        color = Makie.wong_colors()[1],
        colorim= Makie.wong_colors()[2],
        marker = :x,
        modelmarker = :circle,
        markersize = 10.0,
        alpha = 1.0,
        error = false,
    )
end

# This is convienence function to conver the field to a function
# if the field is a symbol, we see if it is an option and return that
convert_field(f) = f

function convert_field(field::Symbol)
    field == :U && return x->x.baseline.U
    field == :V && return x->x.baseline.V
    field == :Ti && return x->x.baseline.Ti
    field == :Fr && return x->x.baseline.Fr
    field == :snr && return x->abs.(measurement(x)) ./ noise(x)
    field == :uvdist && return uvdist
    field == :amp && return x->abs.(measurement(x))
    field == :phase && return x->angle.(measurement(x))

    throw(ArgumentError("$field not supported please use one of (:U, :V, :Ti, :Fr, :snr, :uvdist)"))
end


function Makie.plot!(plot::BaselinePlot{<:Tuple{<:Comrade.EHTObservationTable, 
                                                <:Union{Tuple{Symbol, Symbol}, Colon}, 
                                                <:Any, <:Any}})
    @extract plot (data, bl, fieldx, fieldy)
    obl = @lift begin
        if $bl isa Colon
            return datatable($data)
        else
            datatable(select_baseline($data, $bl))
        end
    end
    @lift begin
        if isempty($obl)
            throw(ArgumentError("Baseline $($bl) does not exist"))
        end
    end

    fx = @lift(convert_field($fieldx))
    fy = @lift(convert_field($fieldy))

    x  = @lift($(fx).($obl))
    y  = @lift($(fy).($obl))

    lift(x, y, plot.error) do x, y, berr
        if eltype(y) <: Complex
            Makie.scatter!(plot, x, real.(y); 
                            color=plot.color, 
                            marker=plot.marker, 
                            markersize=plot.markersize, 
                            alpha=plot.alpha)
            Makie.scatter!(plot, x, imag.(y); 
                            color=plot.colorim, 
                            marker=plot.marker, 
                            markersize=plot.markersize, 
                            alpha=plot.alpha)

        else
            Makie.scatter!(plot, x, y; 
                            color=plot.color, 
                            marker=plot.marker, 
                            markersize=plot.markersize, 
                            alpha=plot.alpha)
            if berr
                eltype(y) <: Measurements.Measurement || throw(ArgumentError("Field does not have error, did use measwnoise?"))
                Makie.errorbars!(plot, x, y, 
                                 color = plot.color,
                                 alpha = plot.alpha
                                )
            end
                            
        end
    end
    return plot
end


"""
Returns the indices of an EHTObservationTable associated with a given baseline.
"""
function getbaselineind(obsdata::Comrade.EHTObservationTable, site1::Symbol, site2::Symbol)
    sitedata = datatable(obsdata).baseline.sites
    site1 == site2 && throw(ArgumentError("$site1 and $site2 must be different"))

    baselineind = findall(x -> (site1 in x) && (site2 in x), sitedata)
    isempty(baselineind) && throw(ArgumentError("$site1 and $site2 are not a detected baseline"))

    return baselineind
end


"""
Gets the observation data associated with a field. General purpose function.

# Arguments

 - `field` : The field for which data is retrieved. 
    Current fields supported
    :U - baseline u coordinate
    :V - baseline v coordinate
    :Ti - time
    :Fr - frequency
    :measure - measurement
    :noise - noise
    :amp - visibility amplitude
    :phase - visibility phase
    :uvdist - projected baseline length
    :snr - signal to noise ratio
    :res - normalized residual visibilities (only if obsdata contains the residuals)
"""
function getobsdatafield(obsdata::Comrade.EHTObservationTable{T}, field::Symbol) where {T}
    field == :measurement && return Comrade.measurement(obsdata)
    field == :noise && return Comrade.noise(obsdata)

    dt = datatable(obsdata)

    field == :amp    && return abs.(dt.measurement)
    field == :phase  && return angle.(dt.measurement)
    field == :uvdist && return uvdist.(dt)

    
    if field in (:amp, :phase, :uvdist, :snr, :res, :measurement, :noise)
        if field == :amp # calculate visibility amplitudes
            vis = dt.measurement
            amps = abs.(vis)
            return amps
        elseif field == :measurement
            return dt.measurement
        elseif field == :noise
            return dt.noise
        elseif field == :phase # calculate visibility phases
            vis = dt.measurement
            phases = angle.(vis)
            return phases
        elseif field == :snr
            vis = dt.measurement
            sigma = dt.noise
            snr = abs.(vis) .* inv.(sigma)
            return snr
        elseif field == :uvdist # calculate uv Distance
            dt = datatable(obsdata)
            return uvdist.(dt)
        elseif field == :res
            vis = dt.measurement
            sigma = dt.noise
            res = vis .* inv.(sigma)
            @show typeof(res)
            return res
        end
    elseif field in (:U, :V, :Ti, :Fr)
        bls = datatable(obsdata).baseline
        if T<: Comrade.ClosureProducts
            return getproperty(bls.:(1), field)
        end
        return getproperty(bls, field)
    else
        throw(ArgumentError("$field not supported"))
    end
end


function frequencylabel(ν::Number)
    if ν > 1e6
        if ν > 1e12
            label = @sprintf("%.2f", ν / 1e12) * " THz"
        elseif ν > 1e9
            label = @sprintf("%.2f", ν / 1e9) * " GHz"
        else
            label = @sprintf("%.2f", ν / 1e6) * " MHz"
        end
    else
        label = @sprintf("%.2f", ν) * " Hz"
    end
    return label
end

_frequency(d::EHTObservationTable) = domain(d).Fr
_frequency(d::EHTObservationTable{<:Comrade.ClosureProducts}) = datatable(d).baseline.:(1).Fr
measname(d::EHTObservationTable{<:Comrade.EHTVisibilityDatum}) = "Visibility (Jy)"
measname(d::EHTObservationTable{<:Comrade.EHTClosurePhaseDatum}) = "Closure Phase (rad)"
measname(d::EHTObservationTable{<:Comrade.EHTLogClosureAmplitudeDatum}) = "Log Closure Amplitude"
measname(d::EHTObservationTable{<:Comrade.EHTCoherencyDatum}) = "Coherency (Jy)"
measname(d::EHTObservationTable{<:Comrade.EHTVisibilityAmplitudeDatum}) = "Visibility Amplitude (Jy)"

"""
Plots two data fields against each other.

# Arguments
 - `obsdata` : EHTObservationTable containing the data to plot (closure quantities not supported yet)

 - `field1` and `field2` : The fields to plot. field1 - x axis, field2 - y axis 
    Current fields supported:
    :U - baseline u coordinate
    :V - baseline v coordinate
    :Ti - time
    :Fr - frequency
    :measure - measurement
    :noise - noise
    :amp - visibility amplitude
    :phase - visibility phase
    :uvdist - projected baseline length
    :snr - signal to noise ratio
    :res - normalized residual visibilities (only if obsdata contains the residuals)

 - `site1` and `site2` : Keywords for the sites forming the baseline being plotted, e.g. :ALMA, :APEX.
 - `axis_kwargs` : Keyword arguments for each subplot's Axis.
 - `legend_kwargs` : Keyword arguments passed to the figure legend.
 - `scatter_kwargs` : Keyword arguments passed to scatter! in each subplot.
"""
function plotfields(
    obsdata::Comrade.EHTObservationTable,
    field1::Symbol,
    field2::Symbol;
    legend = true,
    conjugate = true,
    axis_kwargs = (;),
    legend_kwargs = (;),
    scatter_kwargs = (;),
)

    labels = (;
        U = L"v $(\lambda)$",
        V = L"v $(\lambda)$",
        Ti = "Time (UTC)",
        Fr = "Frequency (Hz)",
        measurement = measname(obsdata),
        amp = "Visibility Amplitude (Jy)",
        phase = "Visibility Phase (rad)",
        uvdist = "Projected Baseline Distance λ",
        snr = "SNR",
        res = "Normalized Residual Visibility",
    )

    axis_kwargs = (;
        axis_kwargs...,
        xlabel = getproperty(labels, field1),
        ylabel = getproperty(labels, field2),
    )

    x = getobsdatafield(obsdata, field1)
    y = getobsdatafield(obsdata, field2)
    Fr = _frequency(obsdata)
    @info obsdata
    if conjugate == true # conjugating for (u,v) plotting
        if field1 in (:U, :V) && field2 in (:U, :V) # conjugating for (u,v) plotting 
            x = [x; -x]
            y = [y; -y]
            Fr = [Fr; Fr]
            axis_kwargs = (; axis_kwargs..., aspect = 1)
        end
    end

    νlist = unique(Fr) # multifrequency support

    fig = Figure()
    plotaxis(
        fig[1, 1],
        x,
        y,
        Fr,
        νlist;
        legend = legend,
        axis_kwargs = (; axis_kwargs...),
        scatter_kwargs = (; scatter_kwargs...),
        legend_kwargs = (; legend_kwargs...),
    )
    return fig
end

function plotfields(
    obsdata::Comrade.EHTObservationTable,
    field1::Symbol,
    field2::Symbol,
    site1::Symbol,
    site2::Symbol;
    axis_kwargs = (;),
    legend_kwargs = (;),
    scatter_kwargs = (;),
)
    title = string(site1) * " - " * string(site2)
    siteind = getbaselineind(obsdata, site1, site2)
    return plotfields(
        obsdata[siteind],
        field1::Symbol,
        field2::Symbol;
        axis_kwargs = (; axis_kwargs..., title = title),
        legend_kwargs = legend_kwargs,
        scatter_kwargs = scatter_kwargs,
    )
end

"""
Plots two data fields against each other, returns a Makie Axis which can be used to configure subplots.

# Arguments
- `obsdata` : EHTObservationTable containing the data to plot (closure quantities not supported yet)

- `field1` and `field2` : The fields to plot. field1 - x axis, field2 - y axis 
    Current fields supported:
    :U - baseline u coordinate
    :V - baseline v coordinate
    :Ti - time
    :Fr - frequency
    :measurment - measurement
    :noise - noise
    :amp - visibility amplitude
    :phase - visibility phase
    :uvdist - projected baseline length
    :snr - signal to noise ratio
    :res - normalized residual visibilities (only if obsdata contains the residuals)

# Keyword Arguments
 - `legend` : If true, legend is shown. If false, legend is hidden.
 - `conjugate` : Only relevant if plotting (u,v) coverage. If true, data is conjugated. If false, data is plotted as is. 
 - `site1` and `site2` : Keywords for the sites forming the baseline being plotted, e.g. :ALMA, :APEX.
 - `axis_kwargs` : Keyword arguments for each subplot's Axis.
 - `legend_kwargs` : Keyword arguments passed to the figure legend.
 - `scatter_kwargs` : Keyword arguments passed to scatter! in each subplot.
"""
function axisfields(
    fig::GridPosition,
    obsdata::Comrade.EHTObservationTable,
    field1::Symbol,
    field2::Symbol;
    legend = true,
    conjugate = true,
    axis_kwargs = (;),
    legend_kwargs = (;),
    scatter_kwargs = (;),
)
    labels = (;
        U = L"v $(\lambda)$",
        V = L"v $(\lambda)$",
        Ti = "Time (UTC)",
        Fr = "Frequency (Hz)",
        amp = "Visibility Amplitude (Jy)",
        phase = "Visibility Phase (rad)",
        uvdist = L"Projected Baseline Distance $(\lambda)$",
        snr = "SNR",
        res = "Normalized Residual Visibility",
    )

    axis_kwargs = (;
        axis_kwargs...,
        xlabel = getproperty(labels, field1),
        ylabel = getproperty(labels, field2),
    )

    x = getobsdatafield(obsdata, field1)
    y = getobsdatafield(obsdata, field2)
    Fr = _frequency(obsdata)

    if conjugate == true # conjugating for (u,v) plotting
        if field1 in (:U, :V) && field2 in (:U, :V) # conjugating for (u,v) plotting 
            x = [x; -x]
            y = [y; -y]
            Fr = [Fr; Fr]
            axis_kwargs = (; axis_kwargs..., aspect = 1)
        end
    end

    νlist = unique(Fr) # multifrequency support
    ax = plotaxis(
        fig,
        x,
        y,
        Fr,
        νlist;
        legend = legend,
        axis_kwargs = (; axis_kwargs...),
        scatter_kwargs = (; scatter_kwargs...),
        legend_kwargs = (; legend_kwargs...),
    )
    return ax
end

function axisfields(
    fig::GridPosition,
    obsdata::Comrade.EHTObservationTable,
    field1::Symbol,
    field2::Symbol,
    site1::Symbol,
    site2::Symbol;
    legend = true,
    axis_kwargs = (;),
    legend_kwargs = (;),
    scatter_kwargs = (;),
)
    title = string(site1) * " - " * string(site2)
    siteind = getbaselineind(obsdata, site1, site2)
    return axisfields(
        fig,
        obsdata[siteind],
        field1::Symbol,
        field2::Symbol;
        legend = legend,
        axis_kwargs = (; axis_kwargs..., title = title),
        legend_kwargs = legend_kwargs,
        scatter_kwargs = scatter_kwargs,
    )
end

function plotaxis(
    fig::GridPosition,
    x::AbstractArray,
    y::AbstractArray,
    Fr::AbstractArray,
    νlist::AbstractArray;
    legend = true,
    axis_kwargs = (;),
    scatter_kwargs = (;),
    legend_kwargs = (;),
)
    ax = Axis(fig; axis_kwargs...)
    @info νlist
    for ν in νlist
        νind = findall(==(ν), Fr)
        label = frequencylabel(ν)
        if eltype(x) <: Complex
            scatter!(
                ax,
                real.(x[νind]),
                y[νind],
                label = label * " Real";
                scatter_kwargs...,
            )
            scatter!(
                ax,
                imag.(x[νind]),
                y[νind],
                label = label * " Imag";
                scatter_kwargs...,
            )
        elseif eltype(y) <: Complex
            scatter!(
                ax,
                x[νind],
                real.(y[νind]),
                label = label * " Real";
                scatter_kwargs...,
            )
            scatter!(
                ax,
                x[νind],
                imag.(y[νind]),
                label = label * " Imag";
                scatter_kwargs...,
            )
        else
            scatter!(ax, x[νind], y[νind], label = label; scatter_kwargs...)
        end
    end

    if legend == true
        axislegend(ax; legend_kwargs...)
    end
end

"""
Automatically generate a grid of subplots plotting the Comrade.CalTable information.
Each subplot corresponds to a different station in the array.

## Argments

 - `gt` : The CalTable to plot.

## Keyword Arguments
 - `width` : Subplot width
 - `height` : Subplot height
 - `layout` : Subplot layout (optional). 
 - `axis_kwargs` : Keyword arguments for each subplot's Axis.
 - `legend_kwargs` : Keyword arguments passed to the figure legend.
 - `figure_kwargs` : Keyword arguments passed to Figure().
 - `scatter_kwargs` : Keyword arguments passed to scatter! in each subplot.
"""
function plotcaltable(
    gt::Comrade.CalTable;
    width = 150,
    height = 125,
    layout = nothing,
    axis_kwargs = (;),
    legend_kwargs = (;),
    figure_kwargs = (;),
    scatter_kwargs = (;),
)
    sitelist = sites(gt)

    if isnothing(layout)
        collen = 4
        rowlen = ceil(length(sitelist) / collen)
    else
        (rowlen, collen) = layout
    end

    size = (width * (collen), height * (rowlen) + 50) # height + 50 is for the UTC label

    fig = Figure(; size, figure_kwargs...)
    for n in range(1, rowlen) # loop over every station
        for m in range(1, collen)
            ind = Int(collen * (n - 1) + m)

            if ind <= length(sitelist)
                site = sites(gt)[ind]

                ax = Axis(
                    fig[Int(n), Int(m)],
                    title = string(site),
                    width = width,
                    height = height,
                    axis_kwargs...,
                )

                νlist = unique(gt.Fr)
                for ν in νlist
                    νind = findall(x -> x == ν, gt.Fr)
                    x = getproperty.(gt.Ti, :t0)[νind]
                    y = getproperty(gt, site)[νind]

                    if eltype(y) >: Float64
                        scatter!(
                            ax,
                            x,
                            y,
                            label = frequencylabel(round(ν.central, digits = 2)),
                            scatter_kwargs...,
                        )
                    else
                        missingind = findall(x -> typeof(x) == Missing, y)
                        y[missingind] .= NaN
                        yval = getproperty.(y, :val)
                        yerr = getproperty.(y, :err)

                        errorbars!(x, yval, yerr, scatter_kwargs...)
                        scatter!(
                            x,
                            yval,
                            label = frequencylabel(round(ν.central, digits = 2)),
                            scatter_kwargs...,
                        )
                    end
                end

                if n == 1 && m == 1
                    Legend(fig[1, Int(collen + 1)], ax, legend_kwargs...)
                end

                if n == rowlen && m == 1
                    ax.xlabel = "Time (UTC)"
                end
            end
        end
    end
    resize_to_layout!(fig)
    fig
end

end
