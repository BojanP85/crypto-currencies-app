import { useEffect, useState } from 'react';

export const useWebsocket = (initialChannel = {}, initialPairs = null) => {
  const [channels, setChannels] = useState(initialChannel);
  const [pairs, setPairs] = useState(initialPairs);

  useEffect(() => {
    let isMounted = true;
    let channelsObject = {};

    const wss = new WebSocket('wss://api-pub.bitfinex.com/ws/2');

    wss.onopen = () => {
      if (pairs) {
        for (let i of pairs) {
          let pair = { "event": "subscribe", "channel": "ticker" };
          pair.symbol = `t${i.toUpperCase()}`;
          wss.send(JSON.stringify(pair));
        }
      }
    };

    wss.onmessage = event => {
      let data = JSON.parse(event.data);

      if (data.event === 'subscribed') {
        if (isMounted) {
          setChannels(prevValues => {
            return { ...prevValues, [data.symbol]: data };
          });
          channelsObject[data.chanId] = data;
        }
      } else {
        if (data[1] !== 'hb') {
          let chanName = channelsObject[data[0]];

          if (chanName) {
            Object.keys(channelsObject).forEach(key => {
              if (chanName.chanId.toString() === key && data[1] && data[1].length === 10) {
                if (isMounted) {
                  setChannels(prevValues => {
                    return { ...prevValues, [chanName.symbol]: data[1] };
                  });
                }
              }
            });
          }
        }
      }
    };

    wss.onclose = () => {
      wss.close();
    };

    return () => { isMounted = false };
  }, [pairs]);

  return {
    channels,
    setChannels,
    pairs,
    setPairs
  };
};
