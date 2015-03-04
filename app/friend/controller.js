import BeingsArray from 'square_being/controller';

class Friends extends BeingsArray {
  constructor() {
    super();
  }

  render(ctx) {
    for (let i = 0, il = this._array.length, friend; friend = this._array[i], i < il; i++) {
      if (! friend.isOnPath && friend.hasPaths) {
        friend.direction = friend.pathList.pop();
        friend.hasPaths = friend.pathList.length > 0;
        friend.makeMovement();
      }

      friend.render(ctx);
    }
  }
}

export let friends = new Friends();