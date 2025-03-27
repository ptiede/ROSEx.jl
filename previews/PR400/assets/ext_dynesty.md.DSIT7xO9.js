import{_ as a,c as i,o as e,ai as n}from"./chunks/framework.D0bnDPHY.js";const y=JSON.parse('{"title":"Dynesty Extension","description":"","frontmatter":{},"headers":[],"relativePath":"ext/dynesty.md","filePath":"ext/dynesty.md","lastUpdated":null}'),t={name:"ext/dynesty.md"};function l(p,s,h,r,o,k){return e(),i("div",null,s[0]||(s[0]=[n(`<h1 id="Dynesty-Extension" tabindex="-1">Dynesty Extension <a class="header-anchor" href="#Dynesty-Extension" aria-label="Permalink to &quot;Dynesty Extension {#Dynesty-Extension}&quot;">​</a></h1><p><code>Dynesty</code> interfaces <code>Comrade</code> to the excellent <a href="https://github.com/joshspeagle/dynesty" target="_blank" rel="noreferrer"><code>dynesty</code></a> package, more specifically the <a href="https://github.com/ptiede/Dynesty.jl" target="_blank" rel="noreferrer">Dynesty.jl</a> Julia wrapper.</p><p>We follow <code>Dynesty.jl</code> interface closely. However, instead of having to pass a log-likelihood function and prior transform, we instead just pass a <code>Comrade.VLBIPosterior</code> object and <code>Comrade</code> takes care of defining the prior transformation and log-likelihood for us. For more information about <code>Dynesty.jl</code>, please see its <a href="https://github.com/ptiede/Dynesty.jl" target="_blank" rel="noreferrer">docs</a> and docstrings.</p><h2 id="example" tabindex="-1">Example <a class="header-anchor" href="#example" aria-label="Permalink to &quot;Example&quot;">​</a></h2><div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">using</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Comrade</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">using</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Dynesty</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Some stuff to create a posterior object</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">post </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># of type Comrade.Posterior</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Create sampler using 1000 live points</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">smplr </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> NestedSampler</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(;nlive</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1000</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">chain </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> dysample</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(post, smplr; dlogz</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1.0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Optionally resample the chain to create an equal weighted output</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">using</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> StatsBase</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">equal_weight_chain </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Comrade</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">resample_equal</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(samples, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">10_000</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span></code></pre></div>`,5)]))}const c=a(t,[["render",l]]);export{y as __pageData,c as default};
