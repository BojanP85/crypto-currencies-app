import { useEffect, useState } from 'react';

export const useWebsocket = (initialChannel = {}, initialPairs = []) => {
  const [pairs, setPairs] = useState(initialPairs);
  const [channel, setChannel] = useState(initialChannel);

  useEffect(() => {
    let isMounted = true;
    let channels = {};

    const wss = new WebSocket('wss://api-pub.bitfinex.com/ws/2');

    wss.onopen = () => {
      for (let i of pairs) {
        let pair = { "event": "subscribe", "channel": "ticker" };
        pair.symbol = `t${i.toUpperCase()}`;
        wss.send(JSON.stringify(pair));
      }
    };

    wss.onmessage = event => {
      let data = JSON.parse(event.data);

      if (data.event === 'subscribed') {
        if (isMounted) {
          setChannel(prevValues => {
            return { ...prevValues, [data.symbol]: data }
          });
        }
        channels[data.chanId] = data.symbol;
      } else {
        if (data.shift) {
          let chanId = data.shift();
          // console.log('chanId', chanId);

          if (data[0] !== "hb") {
            let chanName = channels[chanId];
            // console.log('chanName', chanName);

            Object.keys(channel).forEach(key => {
              if (chanName === key && data[0] && data[0].length === 10) {
                if (isMounted) {
                  setChannel(prevValues => {
                    return { ...prevValues, [key]: data[0] }
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
    channel,
    setChannel,
    pairs,
    setPairs
  };
};
