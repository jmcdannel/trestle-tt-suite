// import api from '../Api';

const locoDefaults = {
  isAcquired: false,
  cruiseControl: false,
  autoStop: true,
  maxSpeed: 100,
  speed: 0,
  forward: true,
  lastAcquired: null,
  lastUpdated: null
};

const Reducer = (state, action) => {
  switch(action.type) {

    case 'INIT_STATE':
      console.log('Reducer INIT_STATE', action.payload);
      return {...state, ...action.payload };

    case 'UPDATE_CONNECTIONS':
      return {
        ...state,
        connections: action.payload
      };

    case 'UPDATE_CONNECTION':
      const orig = state.connections.get(action.payload.connectionId);
      const newConn = new Map(state.connections);
      newConn.set(action.payload.connectionId, {...orig, ...action.payload });
      // state.connections = new Map(state.connections)
      // state.connections.set(action.payload.connectionId, {...orig, ...action.payload });
      console.log('REDUCER', state, action);
      // return state;
      return {...state, connections: newConn };

    case 'UPDATE_LOCOS':
      return {
        ...state,
        locos: action.payload.map(loco => ({ ...locoDefaults, ...loco }))
      };

    case 'UPDATE_LOCO':
      const locos = state.locos.map(loco => 
        loco.address === action.payload.address
          ? {  ...locoDefaults, ...loco, ...action.payload }
          : {  ...locoDefaults, ...loco }
      );
      return {
        ...state,
        locos
      };

    case 'UPDATE_TURNOUTS':
      return {
        ...state,
        turnouts: action.payload
      };

    case 'UPDATE_TURNOUT':
      // await api.turnouts.put(action.payload);
      const turnouts = state.turnouts.map(turnout => 
        turnout.turnoutId === action.payload.turnoutId
          ? { ...turnout, ...action.payload }
          : turnout
      );
      return {
        ...state,
        turnouts
      };

    case 'UPDATE_EFFECTS':
      return {
        ...state,
        effects: action.payload
      };

    case 'UPDATE_EFFECT':
      const effects = state.effects.map(effect => 
        effect.effectId === action.payload.effectId
          ? { ...effect, ...action.payload }
          : effect
      );
      return {
        ...state,
        effects
      };

    case 'UPDATE_SIGNALS':
      return {
        ...state,
        signals: action.payload
      };

    case 'UPDATE_SENSORS':
      return {
        ...state,
        sensors: action.payload
      };

    case 'UPDATE_ROUTES':
      return {
        ...state,
        routes: action.payload
      };

    case 'UPDATE_PORTS':
      return {
        ...state,
        ports: action.payload
      };

    case 'UPDATE_USER_PREFERENCES':
      const key = Object.keys(action.payload)[0];
      const rawValue = action.payload[key];
      console.log('rawValue', rawValue, typeof rawValue);
      const value = typeof rawValue === 'object'
        ? JSON.stringify(rawValue)
        : rawValue;
      window.localStorage.setItem(key, value);
      return {
        ...state,
        userPreferences: { ...state.userPreferences, ...action.payload }
      };

    default:
      console.warn('REDUCER NOT FOUND: ', action);
      return state;    
  }
}

export default Reducer;
