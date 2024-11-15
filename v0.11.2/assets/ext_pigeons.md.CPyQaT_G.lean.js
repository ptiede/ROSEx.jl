import{_ as e,o as a,c as i,a5 as t}from"./chunks/framework.DG6Iku5T.js";const c=JSON.parse('{"title":"Pigeons Extension","description":"","frontmatter":{},"headers":[],"relativePath":"ext/pigeons.md","filePath":"ext/pigeons.md","lastUpdated":null}'),n={name:"ext/pigeons.md"};function p(l,s,o,r,h,d){return a(),i("div",null,s[0]||(s[0]=[t(`<h1 id="Pigeons-Extension" tabindex="-1">Pigeons Extension <a class="header-anchor" href="#Pigeons-Extension" aria-label="Permalink to &quot;Pigeons Extension {#Pigeons-Extension}&quot;">​</a></h1><p><code>Comrade</code> intefaces to the <a href="https://github.com/Julia-Tempering/Pigeons.jl" target="_blank" rel="noreferrer"><code>Pigeons.jl</code></a> package.</p><p>The interface to Pigeons follows the same one as in the Pigeons docs. Since <code>Comrade</code> implements the <code>LogDensityProblems</code> interface it can be used as is. Note that the user must transform the target to either Rⁿ or the unity hypercube using <code>asflat</code> or <code>ascube</code> respectively, before passing it to <code>Pigeons</code>.</p><p>Additionally, <code>pigeons</code> will return the standard output. If you want to directly access the samples you can use the <code>sample_array</code> function and pass the transformed target and the samples object to convert them to the usual parameter space.</p><p>For more information about <code>Pigeons.jl</code> please see its <a href="https://pigeons.run/dev/" target="_blank" rel="noreferrer">docs</a>.</p><h2 id="example" tabindex="-1">Example <a class="header-anchor" href="#example" aria-label="Permalink to &quot;Example&quot;">​</a></h2><div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">using</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Comrade</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">using</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Pigeons</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Some stuff to create a posterior object</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">post </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># of type Comrade.Posterior</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Create sampler using 1000 live points</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">samples </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> pigeons</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(target</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">ascube</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(post), explorer</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">SliceSampler</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(), record</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[traces])</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Transform the samples to the parameter space</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">chain </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> sample_array</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">ascube</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(post), samples)</span></span></code></pre></div>`,7)]))}const g=e(n,[["render",p]]);export{c as __pageData,g as default};
