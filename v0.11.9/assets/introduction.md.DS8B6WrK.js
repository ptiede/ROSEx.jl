import{_ as t,c as a,o as i,ai as o}from"./chunks/framework.BwSw6bqg.js";const g=JSON.parse('{"title":"Introduction","description":"","frontmatter":{},"headers":[],"relativePath":"introduction.md","filePath":"introduction.md","lastUpdated":null}'),r={name:"introduction.md"};function n(l,e,s,d,m,u){return i(),a("div",null,e[0]||(e[0]=[o('<h1 id="introduction" tabindex="-1">Introduction <a class="header-anchor" href="#introduction" aria-label="Permalink to &quot;Introduction&quot;">​</a></h1><p>Comrade is a Bayesian differentiable modular modeling framework for use with very long baseline interferometry. The goal is to allow the user to easily combine and modify a set of primitive models to construct complicated source structures. The benefit of this approach is that it is straightforward to construct different source models out of these primitives. Namely, an end-user does not have to create a separate source &quot;model&quot; every time they change the model specification. Additionally, most models currently implemented are differentiable with at Enzyme. This allows for gradient accelerated optimization and sampling (e.g., HMC) to be used with little effort by the end user.</p><div class="warning custom-block"><p class="custom-block-title">Warning</p><p>As of 0.11 Comrade will only support AD with Enzyme. We have removed support for Zygote and ForwardDiff due to performance issues.</p></div><h2 id="tutorials" tabindex="-1">Tutorials <a class="header-anchor" href="#tutorials" aria-label="Permalink to &quot;Tutorials&quot;">​</a></h2><p>Our tutorial section currently has a large number of examples. The simplest example is fitting simple geometric models to the 2017 M87 data and is detailed in the <a href="/Comrade.jl/v0.11.9/tutorials/beginner/GeometricModeling#Geometric-Modeling-of-EHT-Data">Geometric Modeling of EHT Data</a> tutorial. We also include &quot;non-parametric&quot; modeling or imaging examples in <a href="/Comrade.jl/v0.11.9/tutorials/intermediate/ClosureImaging#Imaging-a-Black-Hole-using-only-Closure-Quantities">Imaging a Black Hole using only Closure Quantities</a>, and <a href="/Comrade.jl/v0.11.9/tutorials/intermediate/StokesIImaging#Stokes-I-Simultaneous-Image-and-Instrument-Modeling">Stokes I Simultaneous Image and Instrument Modeling</a>. There is also an introduction to hybrid geometric and image modeling in <a href="/Comrade.jl/v0.11.9/tutorials/advanced/HybridImaging#Hybrid-Imaging-of-a-Black-Hole">Hybrid Imaging of a Black Hole</a>, which combines physically motivated geometric modeling with the flexibility of image-based models. Finally, we provide a tutorial on how to use <code>Comrade</code> to model polarized data including simultaneously solving for the image and instrumental effects like gain ratios and leakage terms in <a href="/Comrade.jl/v0.11.9/tutorials/intermediate/PolarizedImaging#Polarized-Image-and-Instrumental-Modeling">Polarized Image and Instrumental Modeling</a>.</p><h2 id="contributing" tabindex="-1">Contributing <a class="header-anchor" href="#contributing" aria-label="Permalink to &quot;Contributing&quot;">​</a></h2><p>This repository has recently moved to <a href="https://github.com/SciML/ColPrac" target="_blank" rel="noreferrer">ColPrac</a>. If you would like to contribute please feel free to open a issue or pull-request.</p><h2 id="requirements" tabindex="-1">Requirements <a class="header-anchor" href="#requirements" aria-label="Permalink to &quot;Requirements&quot;">​</a></h2><p>The minimum Julia version we require is 1.10.</p>',9)]))}const h=t(r,[["render",n]]);export{g as __pageData,h as default};
