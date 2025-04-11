import type {GraphqlMenu, MenuItem} from "@/interfaces/menu";

import CONSTANTS from "@/data/config.json";

export const getMenu = async () => {
  
  try {
    const OPTIONS = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        'query': `
        {
          menus {
            nodes {
              slug
              menuItems {
                edges {
                  node {
                    label
                    uri
                    target
                  }
                }
              }
            }
          }
        }`
      })
    }
    const response = await fetch(CONSTANTS.BASE_URL + '/graphql', OPTIONS);
    const graphqlResponse : GraphqlMenu = await response.json();

    const menu = graphqlResponse.data.menus.nodes[0].menuItems.edges;
    let menuItems : Array<MenuItem> = [];

    for (let i = 0; i < menu.length; i++) {
      menuItems.push({
        name: menu[i].node.label,
        href: menu[i].node.uri,
        target: menu[i].node.target,
      });
    }

    return menuItems;
  }
  catch {}
};
