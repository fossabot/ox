class Component {
  constructor(name) {
    this.name = name;
  }

  render() {
    console.log(this.name);
    return this.name;
  }
}

export default Component;
