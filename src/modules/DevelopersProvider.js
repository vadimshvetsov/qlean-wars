import { Component } from 'react';
import { connect } from 'react-redux';

import { selectors } from 'reducers';
import * as mapDispatchToProps from 'sagas';

class DevelopersProvider extends Component {
  componentDidMount() {
    const {
      fetchDevelopers,
      developersStruct: { data },
    } = this.props;
    if (!data) {
      fetchDevelopers();
    }
  }

  render() {
    const {
      developersStruct: { isFetching, data },
      renderLoader,
    } = this.props;
    if (!isFetching && !data) return null;
    if (isFetching && renderLoader) return renderLoader();
    return this.props.children(data);
  }
}

const mapStateToProps = state => ({
  developersStruct: selectors.getDevelopers(state),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DevelopersProvider);
