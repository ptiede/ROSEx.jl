import{_ as e,c as t,o,a6 as a}from"./chunks/framework.D_Wlhr2D.js";const g=JSON.parse('{"title":"Introduction","description":"","frontmatter":{},"headers":[],"relativePath":"introduction.md","filePath":"introduction.md","lastUpdated":null}'),i={name:"introduction.md"},r=a('<h1 id="introduction" tabindex="-1">Introduction <a class="header-anchor" href="#introduction" aria-label="Permalink to &quot;Introduction&quot;">​</a></h1><p>Comrade is a Bayesian differentiable modular modeling framework for use with very long baseline interferometry. The goal is to allow the user to easily combine and modify a set of primitive models to construct complicated source structures. The benefit of this approach is that it is straightforward to construct different source models out of these primitives. Namely, an end-user does not have to create a separate source &quot;model&quot; every time they change the model specification. Additionally, most models currently implemented are differentiable with at Zygote and sometimes ForwardDiff<sup class="footnote-ref"><a href="#fn1" id="fnref1">[1]</a></sup>. This allows for gradient accelerated optimization and sampling (e.g., HMC) to be used with little effort by the end user. To sample from the posterior, we provide a somewhat barebones interface since, most of the time, and we don&#39;t require the additional features offered by most PPLs. Additionally, the overhead introduced by PPLs tends to be rather large. In the future, we may revisit this as Julia&#39;s PPL ecosystem matures.</p><div class="tip custom-block"><p class="custom-block-title">Note</p><p>The primitives the Comrade defines, however, would allow for it to be easily included in PPLs like <a href="https://github.com/TuringLang/Turing.jl" target="_blank" rel="noreferrer"><code>Turing</code></a>.</p></div><h2 id="tutorials" tabindex="-1">Tutorials <a class="header-anchor" href="#tutorials" aria-label="Permalink to &quot;Tutorials&quot;">​</a></h2><p>Our tutorial section currently has a large number of examples. The simplest example is fitting simple geometric models to the 2017 M87 data and is detailed in the <a href="/Comrade.jl/previews/PR360/tutorials/beginner/GeometricModeling#Geometric-Modeling-of-EHT-Data">Geometric Modeling of EHT Data</a> tutorial. We also include &quot;non-parametric&quot; modeling or imaging examples in <a href="/Comrade.jl/previews/PR360/tutorials/intermediate/ClosureImaging#Imaging-a-Black-Hole-using-only-Closure-Quantities">Imaging a Black Hole using only Closure Quantities</a>, and <a href="/Comrade.jl/previews/PR360/tutorials/intermediate/StokesIImaging#Stokes-I-Simultaneous-Image-and-Instrument-Modeling">Stokes I Simultaneous Image and Instrument Modeling</a>. There is also an introduction to hybrid geometric and image modeling in <a href="/Comrade.jl/previews/PR360/tutorials/advanced/HybridImaging#Hybrid-Imaging-of-a-Black-Hole">Hybrid Imaging of a Black Hole</a>, which combines physically motivated geometric modeling with the flexibility of image-based models. Finally, we provide a tutorial on how to use <code>Comrade</code> to model polarized data including simultaneously solving for the image and instrumental effects like gain ratios and leakage terms in <a href="/Comrade.jl/previews/PR360/tutorials/intermediate/PolarizedImaging#Polarized-Image-and-Instrumental-Modeling">Polarized Image and Instrumental Modeling</a>.</p><h2 id="contributing" tabindex="-1">Contributing <a class="header-anchor" href="#contributing" aria-label="Permalink to &quot;Contributing&quot;">​</a></h2><p>This repository has recently moved to <a href="https://github.com/SciML/ColPrac" target="_blank" rel="noreferrer">ColPrac</a>. If you would like to contribute please feel free to open a issue or pull-request.</p><h2 id="requirements" tabindex="-1">Requirements <a class="header-anchor" href="#requirements" aria-label="Permalink to &quot;Requirements&quot;">​</a></h2><p>The minimum Julia version we require is 1.9. In the future we may increase this as Julia advances. ```</p><hr class="footnotes-sep"><section class="footnotes"><ol class="footnotes-list"><li id="fn1" class="footnote-item"><p>As of 0.9 Comrade switched to using full covariance closures. As a result this requires a sparse cholesky solve in the likelihood evaluation which requires which isn&#39;t defined in ForwardDiff. As a result we recommend using Zygote which does work and often is similarly performant (reverse pass is 3-6x slower compared to the forward pass). <a href="#fnref1" class="footnote-backref">↩︎</a></p></li></ol></section>',11),s=[r];function n(l,d,u,m,c,h){return o(),t("div",null,s)}const p=e(i,[["render",n]]);export{g as __pageData,p as default};
