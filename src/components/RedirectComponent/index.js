import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import RedirectActions from '../../redux/actions/redirectActions';
import { useHistory } from 'react-router-dom';

const RedirectComponent = ({ destinationsUrl, emptyRedirectState }) => {
  const history = useHistory();

  useEffect(() => {
    if (destinationsUrl !== false) {
      history.push(destinationsUrl);
      emptyRedirectState();
    }
  }, [destinationsUrl]);
  return null;
};

const mapStateToProps = (state) => {
  return {
    destinationsUrl: state.redirect.destinationsUrl,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    emptyRedirectState: () => {
      dispatch({ type: RedirectActions.EMPTY });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(RedirectComponent);
