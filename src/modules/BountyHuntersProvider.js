import { Component } from 'react';
import { connect } from 'react-redux';
import { navigate } from '@reach/router';

import { selectors } from 'reducers';
import * as mapDispatchToProps from 'sagas';

class BountyHuntersProvider extends Component {
  componentDidMount() {
    const {
      fetchBountyHunters,
      bountyHuntersStruct: { data },
    } = this.props;
    if (!data) {
      fetchBountyHunters();
    }
  }

  onBountyHunterClick = id => () => {
    navigate(`/hunters/${id}`);
  };

  getPropsAndHelpers() {
    const {
      bountyHuntersStruct: { data },
    } = this.props;
    return {
      onBountyHunterClick: this.onBountyHunterClick,
      bountyHunters: data,
    };
  }

  render() {
    const {
      bountyHuntersStruct: { isFetching, data },
      renderLoader,
    } = this.props;
    if (!isFetching && !data) return null;
    if (isFetching && renderLoader) return renderLoader();
    return this.props.children(this.getPropsAndHelpers());
  }
}

const mapStateToProps = state => ({
  bountyHuntersStruct: selectors.getBountyHunters(state),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BountyHuntersProvider);
