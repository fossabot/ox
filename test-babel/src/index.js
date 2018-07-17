import loginCheck from './loginCheck';

/* eslint-disable class-methods-use-this */
@loginCheck
class PageIndex {
  componentDidMount() {
    this.loadData();
  }

  getProps(a, { b = 1, c }, { d = 2, ...others }, props) {
    console.log({
      ...others,
      ...props,
      a,
      b,
      c: { c, d },
    });
  }

  refreshData = function* refreshData() {
    yield Date.now();
    return new Set();
  };

  loadData = async () => {
    await new Promise(resolve => setTimeout(() => resolve(), 3000));
    return new Map();
  };

  @loginCheck
  render() {
    return 'page index';
  }
}
/* eslint-enable class-methods-use-this */

export default PageIndex;
