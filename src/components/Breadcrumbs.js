import useBreadcrumbs from "use-react-router-breadcrumbs";
import React from "react";
import { NavLink } from "react-router-dom";
import icons from "../utils/icons";
const { MdNavigateNext } = icons;
const Breadcrumbs = ({ comic, chapNumber }) => {
  const getComic = ({ match }) => {
    return <span>{comic?.title}</span>;
  };
  const getChapNumber = ({ match }) => {
    return <span>Chapter {chapNumber}</span>;
  };

  const routes = [
    { path: "/", breadcrumb: "Home" },
    { path: "/comic/chapter/", breadcrumb: null },
    { path: "/comic/:slug", breadcrumb: getComic },
    { path: "/comic/:slug/:id", breadcrumb: null },
    { path: "/comic/chapter/:slug", breadcrumb: getComic },
    { path: "/comic/chapter/:slug/:id", breadcrumb: getChapNumber },
    { path: "/user/reset-password/:tokenPassword", breadcrumb: "1" },
    { path: "/admin", breadcrumb: null },
    { path: "/admin/dashboard", breadcrumb: () => <span>DashBoard</span> },
    { path: "/admin/manage-user", breadcrumb: () => <span>Manage User</span> },
    {
      path: "/admin/manage-comic",
      breadcrumb: () => <span>Manage Comic</span>,
    },
    {
      path: "/admin/manage-chapter",
      breadcrumb: () => <span>Manage Chapter</span>,
    },
    {
      path: "/admin/manage-user/:id",
      breadcrumb: ({ match }) => {
        return (
          <span>
            {match.params.id === "new-user" ? "Create User" : "Edit User"}
          </span>
        );
      },
    },
    {
      path: "/admin/manage-comic/:id",
      breadcrumb: ({ match }) => {
        return (
          <span>
            {match.params.id === "new-user" ? "Create Comic" : "Edit Comic"}
          </span>
        );
      },
    },
    {path: '/admin/manage-chapter/:slug', breadcrumb: null},
    {
      path: "/admin/manage-chapter/:slug/:id",
      breadcrumb: ({ match }) => {
        return (
          <span>
            {match.params.id === "new-user" ? "Create Chapter" : "Edit Chapter"}
          </span>
        );
      },
    },
  ];
  const breadcrumbs = useBreadcrumbs(routes);
  return (
    <React.Fragment>
      {breadcrumbs.map(({ match, breadcrumb }, index) => (
        <div key={match.pathname} className="flex items-center">
          <NavLink
            to={match.pathname}
            className={"hover:text-main text-[12px] md:text-base"}
          >
            {breadcrumb}
          </NavLink>
          {index < breadcrumbs.length - 1 && (
            <MdNavigateNext size={24} className="mx-2" />
          )}
        </div>
      ))}
    </React.Fragment>
  );
};
export default Breadcrumbs;
