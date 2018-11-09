import { Component } from 'react';
import { connect } from 'react-redux';

import { selectors } from 'reducers';
import * as mapDispatchToProps from 'sagas';

class DeveloperProvider extends Component {
  componentDidMount() {
    const {
      fetchDeveloper,
      developerStruct: { data },
      id,
    } = this.props;
    if (!data) {
      fetchDeveloper(id);
    }
  }

  componentDidUpdate(prevProps) {
    const {
      fetchDeveloper,
      developerStruct: { data },
      id,
    } = this.props;
    if (prevProps.id !== id) {
      if (!data) {
        fetchDeveloper(id);
      }
    }
  }

  render() {
    const {
      developerStruct: { isFetching, data },
      renderLoader,
    } = this.props;
    if (!isFetching && !data) return null;
    if (isFetching && renderLoader) return renderLoader();
    return this.props.children(data);
  }
}

const mapStateToProps = (state, { id }) => ({
  developerStruct: selectors.getDeveloper(id)(state),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DeveloperProvider);
