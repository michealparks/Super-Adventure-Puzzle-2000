let channels = new Map();

export function publish (name, data) {
  let channel = channels.get(name);
  
  if (! channel) return;

  for (let i = 0, il = channel.length; i < il; i++) {
    channel[i](data);
  }
} 

export function subscribe (name, func) {
  if (! channels.has(name)) channels.set(name, []);
  channels.get(name).push(func);
}

export function unsubscribe (name, func) {
  let channel = channels.get(name);
  let result;

  if (! channel) throw new Error('No channel to unsubscribe from.');

  for (let i = 0, il = channel.length; i < il; i++) {
    if (channel[i] === func) {
      result = channel.splice(i, 1);
      break;
    }
  }

  if (! result) throw new Error('No listener was unsubscribed.')
}
