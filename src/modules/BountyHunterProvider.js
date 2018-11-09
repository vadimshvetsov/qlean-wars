import { Component } from 'react';
import { connect } from 'react-redux';

import { selectors } from 'reducers';
import * as mapDispatchToProps from 'sagas';

class BountyHunterProvider extends Component {
  componentDidMount() {
    const {
      fetchBountyHunter,
      bountyHunterStruct: { data },
      id,
    } = this.props;
    if (!data) {
      fetchBountyHunter(id);
    }
  }

  render() {
    const {
      bountyHunterStruct: { isFetching, data },
      renderLoader,
      children,
    } = this.props;
    if (!isFetching && !data) return null;
    if (isFetching && renderLoader) return renderLoader();
    return children(data);
  }
}

const mapStateToProps = (state, { id }) => ({
  bountyHunterStruct: selectors.getBountyHunter(id)(state),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BountyHunterProvider);
