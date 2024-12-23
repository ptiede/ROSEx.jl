import{d as c,o as n,c as o,j as e,k as p,g as h,t as m,_ as u,F as f,C as _,b,K as v,a as i,G as l}from"./chunks/framework.BmjlC9hS.js";const y={class:"img-box"},I=["href"],k=["src"],w={class:"transparent-box1"},x={class:"caption"},T={class:"transparent-box2"},M={class:"subcaption"},P={class:"opacity-low"},B=c({__name:"GalleryImage",props:{href:{},src:{},caption:{},desc:{}},setup(g){return(t,s)=>(n(),o("div",y,[e("a",{href:t.href},[e("img",{src:p(h)(t.src),height:"150px",alt:""},null,8,k),e("div",w,[e("div",x,[e("h2",null,m(t.caption),1)])]),e("div",T,[e("div",M,[e("p",P,m(t.desc),1)])])],8,I)]))}}),G=u(B,[["__scopeId","data-v-fccfcd4e"]]),D={class:"gallery-image"},A=c({__name:"Gallery",props:{images:{}},setup(g){return(t,s)=>(n(),o("div",D,[(n(!0),o(f,null,_(t.images,r=>(n(),b(G,v({ref_for:!0},r),null,16))),256))]))}}),d=u(A,[["__scopeId","data-v-a34ec853"]]),L=JSON.parse('{"title":"Tutorials","description":"","frontmatter":{},"headers":[],"relativePath":"tutorials/index.md","filePath":"tutorials/index.md","lastUpdated":null}'),C={name:"tutorials/index.md"},N=c({...C,setup(g){const t=[{href:"beginner/LoadingData",src:"../vis.png",caption:"Loading Data with Pyehtim",desc:"How to load data using standard eht-imaging in Julia."},{href:"beginner/GeometricModeling",src:"../geom_model.png",caption:"Geometric Modeling of M87*",desc:"Modeling a black hole with simple geometric models"}],s=[{href:"intermediate/ClosureImaging",src:"../closure.png",caption:"Closure Imaging of M87*",desc:"Creating an image of a black hole using only closure information"},{href:"intermediate/StokesIImaging",src:"../stokesI.png",caption:"Simultaneous Imaging and Gain Modeling of M87*",desc:"Imaging a black hole with simultaneous gain modeling (selfcal) using complex visibilities"},{href:"intermediate/PolarizedImaging",src:"../telescopes.jpg",caption:"Full Stokes Imaging using RIME",desc:"Simultaneous instrument and polarized imaging of VLBI data."}],r=[{href:"advanced/HybridImaging",src:"../hybrid.png",caption:"Hybrid ring modeling and residual imaging of M87*",desc:"How to combine everything to model the ring and create a residual image of M87*."}];return(S,a)=>(n(),o("div",null,[a[0]||(a[0]=e("h1",{id:"tutorials",tabindex:"-1"},[i("Tutorials "),e("a",{class:"header-anchor",href:"#tutorials","aria-label":'Permalink to "Tutorials"'},"​")],-1)),a[1]||(a[1]=e("p",null,"This page contains a collection of tutorials that cover a range of topics from beginner to advanced. These demonstrate how to use Comrade in a variety of scenarios. While most of them consider the EHT, they should work more generally for any VLBI arrays.",-1)),a[2]||(a[2]=e("p",null,[i("!!! warning All plots in this tutorial are shown using "),e("code",null,"DisplayAs"),i(" to prevent the webpage from being too big and slow. You do not need to include "),e("code",null,"|> DisplayAs.PNG |> DisplayAs.Text"),i(" in your code when running locally.")],-1)),a[3]||(a[3]=e("h2",{id:"beginner-tutorials",tabindex:"-1"},[i("Beginner Tutorials "),e("a",{class:"header-anchor",href:"#beginner-tutorials","aria-label":'Permalink to "Beginner Tutorials"'},"​")],-1)),l(d,{images:t}),a[4]||(a[4]=e("h2",{id:"intermediate-tutorials",tabindex:"-1"},[i("Intermediate Tutorials "),e("a",{class:"header-anchor",href:"#intermediate-tutorials","aria-label":'Permalink to "Intermediate Tutorials"'},"​")],-1)),l(d,{images:s}),a[5]||(a[5]=e("h2",{id:"advanced-tutorials",tabindex:"-1"},[i("Advanced Tutorials "),e("a",{class:"header-anchor",href:"#advanced-tutorials","aria-label":'Permalink to "Advanced Tutorials"'},"​")],-1)),l(d,{images:r})]))}});export{L as __pageData,N as default};
