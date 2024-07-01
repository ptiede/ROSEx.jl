import{d as c,o as i,c as o,j as e,k as h,g as u,t as g,_ as m,F as _,E as p,b as f,M as b,I as r,a as t}from"./chunks/framework.D_Wlhr2D.js";const v={class:"img-box"},y=["href"],I=["src"],k={class:"transparent-box1"},w={class:"caption"},x={class:"transparent-box2"},T={class:"subcaption"},M={class:"opacity-low"},P=c({__name:"GalleryImage",props:{href:{},src:{},caption:{},desc:{}},setup(d){return(a,s)=>(i(),o("div",v,[e("a",{href:a.href},[e("img",{src:h(u)(a.src),height:"150px",alt:""},null,8,I),e("div",k,[e("div",w,[e("h2",null,g(a.caption),1)])]),e("div",x,[e("div",T,[e("p",M,g(a.desc),1)])])],8,y)]))}}),B=m(P,[["__scopeId","data-v-fccfcd4e"]]),$={class:"gallery-image"},G=c({__name:"Gallery",props:{images:{}},setup(d){return(a,s)=>(i(),o("div",$,[(i(!0),o(_,null,p(a.images,n=>(i(),f(B,b({ref_for:!0},n),null,16))),256))]))}}),l=m(G,[["__scopeId","data-v-a34ec853"]]),D=e("h1",{id:"tutorials",tabindex:"-1"},[t("Tutorials "),e("a",{class:"header-anchor",href:"#tutorials","aria-label":'Permalink to "Tutorials"'},"​")],-1),A=e("p",null,"This page contains a collection of tutorials that cover a range of topics from beginner to advanced. These demonstrate how to use Comrade in a variety of scenarios. While most of them consider the EHT, they should work more generally for any VLBI arrays.",-1),S=e("p",null,[t("!!! warning All plots in this tutorial are shown using "),e("code",null,"DisplayAs"),t(" to prevent the webpage from being too big and slow. You do not need to include "),e("code",null,"|> DisplayAs.PNG |> DisplayAs.Text"),t(" in your code when running locally.")],-1),C=e("h2",{id:"beginner-tutorials",tabindex:"-1"},[t("Beginner Tutorials "),e("a",{class:"header-anchor",href:"#beginner-tutorials","aria-label":'Permalink to "Beginner Tutorials"'},"​")],-1),H=e("h2",{id:"intermediate-tutorials",tabindex:"-1"},[t("Intermediate Tutorials "),e("a",{class:"header-anchor",href:"#intermediate-tutorials","aria-label":'Permalink to "Intermediate Tutorials"'},"​")],-1),L=e("h2",{id:"advanced-tutorials",tabindex:"-1"},[t("Advanced Tutorials "),e("a",{class:"header-anchor",href:"#advanced-tutorials","aria-label":'Permalink to "Advanced Tutorials"'},"​")],-1),j=JSON.parse('{"title":"Tutorials","description":"","frontmatter":{},"headers":[],"relativePath":"tutorials/index.md","filePath":"tutorials/index.md","lastUpdated":null}'),N={name:"tutorials/index.md"},z=c({...N,setup(d){const a=[{href:"beginner/LoadingData",src:"../vis.png",caption:"Loading Data with Pyehtim",desc:"How to load data using standard eht-imaging in Julia."},{href:"beginner/GeometricModeling",src:"../geom_model.png",caption:"Geometric Modeling of M87*",desc:"Modeling a black hole with simple geometric models"}],s=[{href:"intermediate/ClosureImaging",src:"../closure.png",caption:"Closure Imaging of M87*",desc:"Creating an image of a black hole using only closure information"},{href:"intermediate/StokesIImaging",src:"../stokesI.png",caption:"Simultaneous Imaging and Gain Modeling of M87*",desc:"Imaging a black hole with simultaneous gain modeling (selfcal) using complex visibilities"},{href:"intermediate/PolarizedImaging",src:"../telescopes.jpg",caption:"Full Stokes Imaging using RIME",desc:"Simultaneous instrument and polarized imaging of VLBI data."}],n=[{href:"advanced/HybridImaging",src:"../hybrid.png",caption:"Hybrid ring modeling and residual imaging of M87*",desc:"How to combine everything to model the ring and create a residual image of M87*."}];return(V,E)=>(i(),o("div",null,[D,A,S,C,r(l,{images:a}),H,r(l,{images:s}),L,r(l,{images:n})]))}});export{j as __pageData,z as default};
