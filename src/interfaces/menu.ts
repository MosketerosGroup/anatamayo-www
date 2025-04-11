export interface MenuItem {
  name: string;
  href: string;
  target: string;
}


// Interface for GraphQL response
interface MenuItemGraphql {
  label: string;
  uri: string;
  target: string;
}

interface nodeGraphql {
  node: MenuItemGraphql;
}

interface menuItemsGraphql {
  edges: Array<nodeGraphql>;
}

type nodesGraphql = Array<{
  slug: string;
  menuItems: menuItemsGraphql;
}>;

interface menusGraphql {
  nodes: nodesGraphql
}

interface dataGraphql {
  menus: menusGraphql;
}

export interface GraphqlMenu {
  data: dataGraphql;
  extensions: any;
}