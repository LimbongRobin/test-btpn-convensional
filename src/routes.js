import React from "react";
const Body = React.lazy(() => import("./views/layout/component/body/body.component"));


const Task = React.lazy(() =>
  import("./views/layout/component/task/task.component")
);

const ListContact = React.lazy(() =>
  import("./views/layout/component/list-contact/list-contact.component")
);

const routes =[
    {path:"/task", exact:true, name:"task", component:Task},
    // {path:"/body", exact:true, name:"body", component:Body},

    {
      path: "/body",
      name: "body",
      component: Body,
    },

    {
      path: "/list-contact",
      name: "list-contact",
      component: ListContact,
    },

]

export default routes;
