import { useContext } from 'react';
import { Context } from '../Store/Store';
import actionApi from '../Shared/api/actionApi';
import { useMqtt } from '../Core/Com/MqttProvider'
import { useDcc } from '../Dcc/useDcc'

export function useLayoutEffect() {
  const [ state,dispatch ] = useContext(Context);
  const { publish } = useMqtt();
  const { setOutput } = useDcc()

  const effects = state.effects

  async function updateEffect(effect) {
    try {
      console.log('API.handleEffect', effect);

      if (effect?.config?.interface === 'dcc-js-api') {
        handleDcc(effect);
      } else if (effect?.type === 'ialed') {
        await handleIALed(effect);
      } else if (effect?.type === 'macro') {
        await handleMarcro(effect);
      } else {
        publish('ttt-dispatcher', JSON.stringify({
          action: 'effects',
          payload: { 
            effectId: effect.effectId, 
            state: effect.state,
            type: effect.type
          }
        }))
        // actionApi.effects.put(effect);
      }
      await dispatch({ type: 'UPDATE_EFFECT', payload: effect });

    } catch (error) {
      console.error('API.handleEffect', error, effect);
    }
  }

  function getEffectbyId(effectId) {
    return effects.find(e => e.effectId === effectId);
  }

  async function handleIALed(effect) {
    try {
      const action = {
        ...effect.config, 
        command: effect.state ? effect.config.command : 'off'
      }
      publish('ttt-ialed', JSON.stringify(action));
    } catch (err) {
      console.error('[IALED ERROR]', err?.message, JSON.stringify(effect));
    }
  }

  async function handleDcc(effect) {
    try {
      setOutput(effect.config.pin, effect.state);
    } catch (err) {
      console.error('[IALED ERROR]', err?.message, JSON.stringify(effect));
    }
  }

  async function handleMarcro(effect) {
    try {
      console.log('API.handleMarcro', effect);
      effect.config?.on.map(async e => await updateEffect({...getEffectbyId(e), state: effect.state}));
      effect.config?.off.map(async e => await updateEffect({...getEffectbyId(e), state: !effect.state}));
    } catch (err) {
      console.error('[IALED ERROR]', err?.message, JSON.stringify(effect));
    }
  }

  return {
    updateEffect
  }

}

export default useLayoutEffect