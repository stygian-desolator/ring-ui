import React, {Component} from 'react';

import reactDecorator from '../../.storybook/react-decorator';

import alert from '@jetbrains/ring-ui/components/alert-service/alert-service';

import UserAgreement from '@jetbrains/ring-ui/components/user-agreement/user-agreement';
import UserAgreementService from '@jetbrains/ring-ui/components/user-agreement/service';
import text from '@jetbrains/ring-ui/components/user-agreement/toolbox.eula';

export default {
  title: 'Components/User Agreement',
  decorators: [reactDecorator()],

  parameters: {
    component: UserAgreement,
    framework: 'react',
    hermione: {captureSelector: '*[data-test~=ring-dialog]'},
    a11y: {element: '*[data-test~=ring-dialog]'}
  }
};

export const dialog = args => (
  <div>
    <UserAgreement {...args}/>
  </div>
);

dialog.args = {
  // https://github.com/storybookjs/storybook/issues/12635#issuecomment-703392498
  translations: UserAgreement.defaultProps.translations,
  show: true,
  text,
  onRemindLater: null
};
dialog.argTypes = {
  onRemindLater: {}
};
dialog.storyName = 'dialog';

function noop() {}
export const service = ({
  onGetUserAgreemen,
  onGetUserConsent,
  onSetUserConsent = noop,
  onAccept,
  onDecline,
  onDialogShow,
  onDialogHide
}) => {
  const fakeUserAgreement = {
    enabled: true,
    majorVersion: 1.0,
    text
  };

  const fakeUserConsent = {
    guest: true,
    accepted: false
  };

  const agreementService = new UserAgreementService({
    getUserAgreement: async () => {
      onGetUserAgreemen(fakeUserAgreement);
      return fakeUserAgreement;
    },
    getUserConsent: async () => {
      onGetUserConsent(fakeUserConsent);
      return fakeUserConsent;
    },
    setUserConsent: onSetUserConsent,
    onAccept,
    onDecline,
    onDialogShow,
    onDialogHide,
    interval: 10000
  });

  class UserAgreementServiceDemo extends Component {
    componentDidMount() {
      agreementService.startChecking();
    }

    componentWillUnmount() {
      agreementService.stopChecking();
      alert._getShowingAlerts().forEach(item => alert.removeWithoutAnimation(item.key));
    }

    render() {
      return null;
    }
  }

  return <UserAgreementServiceDemo/>;
};

service.argTypes = {
  onGetUserAgreemen: {},
  onGetUserConsent: {},
  onSetUserConsent: {},
  onAccept: {},
  onDecline: {},
  onDialogShow: {},
  onDialogHide: {}
};
service.storyName = 'service';
service.parameters = {
  component: null,
  hermione: {skip: true},
  a11y: {element: '*[data-test="alert-container"]'}
};
