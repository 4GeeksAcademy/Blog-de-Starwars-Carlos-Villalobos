export const initialStore = () => {
  return {
    message: null,
    todos: [
      {
        id: 1,
        title: "Make the bed",
        background: null,
      },
      {
        id: 2,
        title: "Do my homework",
        background: null,
      }
    ],
    characters: [],
    detalle: [],
    favorites: [],
    planets: [],
    favoritesPlanet: [],
    vehicles: []
  }
}

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case 'add_task':

      const { id, color } = action.payload

      return {
        ...store,
        todos: store.todos.map((todo) => (todo.id === id ? { ...todo, background: color } : todo))
      };

    case "getCharacter":
      const { character } = action.payload

      return {
        ...store,
        characters: character
      }

    case "getDetalles":
      const { detalles } = action.payload

      return {
        ...store,
        detalle: detalles
      }
      
    case "set_favorites":
      const { favorites } = action.payload

      return {
        ...store,
        favorites: favorites
      }

    case "getPlanet":
      const {planet} = action.payload

      return{
         ...store,
         planets: planet
      }

    case "set_favoritesPlanet":
      const { favoritesPlanet } = action.payload

      return {
        ...store,
        favoritesPlanet: favoritesPlanet
      }
    
    case "getVehicle":
      const {vehicle} = action.payload

      return {
        ...store,
        vehicles: vehicle
      }

    default:
      throw Error('Unknown action.');
  }
}
