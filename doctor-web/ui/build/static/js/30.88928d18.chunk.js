"use strict";(self.webpackChunkdoctor_appointment_booking=self.webpackChunkdoctor_appointment_booking||[]).push([[30],{30:(e,i,l)=>{l.r(i),l.d(i,{default:()=>m});var s=l(5043),t=(l(8421),l(3204)),n=l(1660),r=l(3003),a=l(3401),o=l(4201),d=l(7390),c=l(579);const p=e=>{let{data:i,formFields:l,handleChange:t}=e;const[n,r]=(0,s.useState)((null===l||void 0===l?void 0:l.services)||[]);return(0,c.jsxs)("div",{className:"form-group",children:[(0,c.jsx)("label",{htmlFor:"services",children:"Services"}),(0,c.jsx)("div",{className:"tags-container",children:n.map((e=>{const l=i.find((i=>i.service_id===e));return(0,c.jsxs)("span",{className:"tag",children:[l.name,(0,c.jsx)("button",{type:"button",className:"remove-tag",onClick:()=>(e=>{const l=n.filter((i=>i!==e));r(l);const s=l.map((e=>{var l;return null===(l=i.find((i=>i.service_id===e)))||void 0===l?void 0:l.service_id}));t({target:{name:"services",value:s}})})(e),children:"\xd7"})]},l.id)}))}),(0,c.jsxs)("select",{id:"services",className:"form-control",onChange:e=>{const l=e.target.value;if(!n.includes(l)){const e=[...n,l];r(e);const s=e.map((e=>{var l;return null===(l=i.find((i=>i.service_id===e)))||void 0===l?void 0:l.service_id}));t({target:{name:"services",value:s}})}},value:"",children:[(0,c.jsx)("option",{value:"",disabled:!0,children:"Select a service"}),i.map((e=>(0,c.jsx)("option",{value:e.service_id,children:e.name},e.id)))]})]})},m=()=>{var e,i,l,m,v,u,h,x;const j=(0,r.wA)(),[g,f]=(0,s.useState)(null),[y,N]=(0,s.useState)(!1),[b,C]=(0,s.useState)(""),[_,E]=(0,s.useState)({display_name:"",title:"",expertiseList:[],experience:"",bio:"",photoUrl:"",phone:"",gender:"",services:[],servicesIds:[],location:{address:"",city:"",state:"",country:""}}),[F,L]=(0,s.useState)(""),{user:S,error:k,loading:w}=(0,r.d4)((e=>null===e||void 0===e?void 0:e.auth)),{data:A,isLoading:U}=(0,d.X1)({});(0,s.useEffect)((()=>{j((0,n.l2)())}),[j]),(0,s.useEffect)((()=>{var e,i,l,s;(!w&&k&&(0,a.oR)(k.message),!S||k||w)||(f(S),E({display_name:S.display_name,title:S.title,expertiseList:S.expertiseList,experience:S.experience,bio:S.bio,photoUrl:"",phone:S.phone,gender:S.gender,services:A,location:{address:null===(e=S.location)||void 0===e?void 0:e.address,city:null===(i=S.location)||void 0===i?void 0:i.city,state:null===(l=S.location)||void 0===l?void 0:l.state,country:null===(s=S.location)||void 0===s?void 0:s.country}}),L(null===S||void 0===S?void 0:S.photoUrl));A&&E((e=>({...e,services:A})))}),[S,k,w,A]);const D=e=>{const{name:i,value:l}=e.target;"expertiseList"===i?E({..._,expertiseList:[..._.expertiseList,l]}):["address","state","city","country"].includes(i)?E({..._,location:{..._.location,[i]:l}}):E("services"===i?{..._,servicesIds:[...l]}:{..._,[i]:l})};return w||U?(0,c.jsx)("div",{className:"flex text-center justify-center",children:(0,c.jsx)(o.A,{size:150,color:"#18A0FB",loading:w})}):(0,c.jsx)("div",{id:"profile",children:(0,c.jsxs)("div",{className:"container",children:[(0,c.jsx)(a.N9,{}),(0,c.jsx)("div",{className:"row justify-content-center mt-4 center",children:(0,c.jsx)("div",{className:"col-md-7",children:(0,c.jsxs)("div",{className:"card shadow-sm",children:[(0,c.jsx)("img",{src:F||"/placeholder.png",alt:"Doctor's profile",className:"rounded-circle mx-auto d-block mt-3",style:{width:"150px",height:"150px",objectFit:"cover"}}),(0,c.jsx)("div",{className:"card-body text-center",children:y?(0,c.jsxs)("form",{onSubmit:async e=>{var i,l;e.preventDefault();const s=new FormData;s.append("display_name",String(_.display_name)),s.append("title",String(_.title)),s.append("phone",String(_.phone)),s.append("gender",String(_.gender)),s.append("bio",String(_.bio)),s.append("experience",Number(_.experience)),_.location&&s.append("location",JSON.stringify(_.location)),null===_||void 0===_||null===(i=_.servicesIds)||void 0===i||i.forEach((e=>s.append("services[]",e))),null===_||void 0===_||null===(l=_.expertiseList)||void 0===l||l.forEach((e=>s.append("expertiseList[]",e))),_.photoUrl&&s.append("file",_.photoUrl);try{j((0,n.eg)(s)),N(!1)}catch(k){console.error("Updating profile failed:",k),400===(null===k||void 0===k?void 0:k.statusCode)?a.oR.error(k.message):a.oR.error("An error occurred while updating your profile.")}},encType:"multipart/form-data",className:"profile-form",children:[(0,c.jsxs)("div",{className:"form-group",children:[(0,c.jsx)("label",{htmlFor:"display_name",children:"Full Name"}),(0,c.jsx)("input",{type:"text",className:"form-control",id:"display_name",name:"display_name",value:(null===_||void 0===_?void 0:_.display_name)||"",onChange:D,placeholder:"Enter name"})]}),(0,c.jsxs)("div",{className:"form-group",children:[(0,c.jsx)("label",{htmlFor:"title",children:"Designation/Title"}),(0,c.jsx)("input",{type:"text",className:"form-control",id:"title",name:"title",value:(null===_||void 0===_?void 0:_.title)||"",onChange:D,placeholder:"Enter title"})]}),(0,c.jsxs)("div",{className:"form-group",children:[(0,c.jsx)("label",{htmlFor:"phone",children:"Phone"}),(0,c.jsx)("input",{type:"tel",className:"form-control",id:"phone",name:"phone",value:(null===_||void 0===_?void 0:_.phone)||"",onChange:D,placeholder:"Enter phone number"})]}),(0,c.jsxs)("div",{className:"form-group",children:[(0,c.jsx)("label",{htmlFor:"bio",children:"Bio"}),(0,c.jsx)("textarea",{className:"form-control",id:"bio",name:"bio",value:(null===_||void 0===_?void 0:_.bio)||"",onChange:D,placeholder:"Tell us about yourself"})]}),(0,c.jsxs)("div",{className:"form-group",children:[(0,c.jsx)("label",{htmlFor:"gender",children:"Gender"}),(0,c.jsxs)("select",{className:"form-control",id:"gender",name:"gender",value:(null===_||void 0===_?void 0:_.gender)||"",onChange:D,children:[(0,c.jsx)("option",{value:"",children:"Select gender"}),(0,c.jsx)("option",{value:"male",children:"Male"}),(0,c.jsx)("option",{value:"female",children:"Female"}),(0,c.jsx)("option",{value:"other",children:"Other"})]})]}),(0,c.jsxs)("div",{className:"form-group",children:[(0,c.jsx)("label",{htmlFor:"experience",children:"Experience"}),(0,c.jsx)("input",{type:"text",className:"form-control",id:"experience",name:"experience",value:(null===_||void 0===_?void 0:_.experience)||"",onChange:D,placeholder:"Enter experience"})]}),(0,c.jsxs)("div",{className:"form-group",children:[(0,c.jsx)("label",{htmlFor:"expertiseList",children:"Specialty/Expertise"}),(0,c.jsxs)("div",{className:"tags-input-wrapper",children:[(0,c.jsx)("div",{className:"tags",children:Array.isArray(null===_||void 0===_?void 0:_.expertiseList)&&_.expertiseList.map(((e,i)=>(0,c.jsxs)("div",{className:"tag",children:[e,(0,c.jsx)("span",{className:"remove-tag",onClick:()=>{return e=i,void E({..._,expertiseList:_.expertiseList.filter(((i,l)=>l!==e))});var e},children:"x"})]},i)))}),(0,c.jsx)("input",{type:"text",value:b,onChange:e=>C(e.target.value),onKeyDown:e=>{var i;"Enter"===e.key&&""!==b.trim()&&(e.preventDefault(),E({..._,expertiseList:null!==(i=_.expertiseList)&&void 0!==i&&i.length?[..._.expertiseList,b.trim()]:[b.trim()]}),C(""))},placeholder:"Press enter to add tags",className:"tagsInput"})]})]}),(0,c.jsx)("div",{className:"form-group",children:(0,c.jsx)(p,{data:A||[],formFields:{services:[]},handleChange:D})}),(0,c.jsxs)("div",{className:"form-group",children:[(0,c.jsx)("label",{htmlFor:"location",children:"Address"}),(0,c.jsx)("input",{type:"text",className:"form-control",id:"location_address",name:"address",value:(null===_||void 0===_||null===(e=_.location)||void 0===e?void 0:e.address)||"",onChange:D,placeholder:"Enter Address"}),(0,c.jsx)("label",{htmlFor:"location",children:"City"}),(0,c.jsx)("input",{type:"text",className:"form-control",id:"location_city",name:"city",value:(null===_||void 0===_||null===(i=_.location)||void 0===i?void 0:i.city)||"",onChange:D,placeholder:"Enter city"}),(0,c.jsx)("label",{htmlFor:"location",children:"State"}),(0,c.jsx)("input",{type:"text",className:"form-control",id:"location_state",name:"state",value:(null===_||void 0===_||null===(l=_.location)||void 0===l?void 0:l.state)||"",onChange:D,placeholder:"Enter state"}),(0,c.jsx)("label",{htmlFor:"location",children:"Country"}),(0,c.jsx)("input",{type:"text",className:"form-control",id:"country",name:"location_country",value:(null===_||void 0===_||null===(m=_.location)||void 0===m?void 0:m.country)||"",onChange:D,placeholder:"Enter country"})]}),(0,c.jsxs)("div",{className:"form-group",children:[(0,c.jsx)("label",{htmlFor:"file",children:"Profile Image"}),(0,c.jsx)("input",{type:"file",className:"form-control",id:"file",name:"file",onChange:e=>{E((i=>({...i,photoUrl:e.target.files[0]})))}})]}),(0,c.jsxs)("div",{className:"form-group divided",children:[(0,c.jsx)("button",{type:"button",onClick:()=>N(!1),className:"btn btn-secondary cancel",children:"Cancel"}),(0,c.jsx)("button",{type:"submit",className:"btn btn-primary save",children:"Save"})]})]}):(0,c.jsxs)("div",{className:"card-body text-center",children:[(0,c.jsx)("h3",{className:"card-title ",children:null===g||void 0===g?void 0:g.display_name}),(0,c.jsx)("h5",{className:"card-title ",children:null===g||void 0===g?void 0:g.title}),(0,c.jsx)("h4",{children:"Expertise "}),(0,c.jsx)("p",{className:"card-subtitle mb-2 text-muted  head-experties",children:null!==g&&void 0!==g&&g.expertiseList&&null!==(v=g.expertiseList)&&void 0!==v&&v.length?null===(u=g.expertiseList)||void 0===u?void 0:u.map(((e,i)=>(0,c.jsx)("p",{className:"experties",children:e},i))):(0,c.jsx)("p",{children:"No Expertise"})}),(0,c.jsxs)("p",{className:"card-text",children:[(0,c.jsx)("span",{className:"text-muted",children:"Experience:"})," ",null===g||void 0===g?void 0:g.experience,"+ years"]}),(0,c.jsx)("h4",{children:"Services "}),(0,c.jsx)("p",{className:"card-subtitle mb-2 text-muted  head-experties",children:null!==g&&void 0!==g&&g.services&&null!==(h=g.services)&&void 0!==h&&h.length?null===(x=g.services)||void 0===x?void 0:x.map(((e,i)=>(0,c.jsx)("p",{className:"experties",children:e.name},i))):(0,c.jsx)("p",{children:"No Expertise"})}),(0,c.jsx)("p",{className:"card-text",children:null===g||void 0===g?void 0:g.bio}),(0,c.jsxs)("button",{onClick:()=>{N(!0)},className:"btn btn-link text-secondary",children:[(0,c.jsx)(t.uO9,{})," Edit"]})]})})]})})})]})})}}}]);
//# sourceMappingURL=30.88928d18.chunk.js.map