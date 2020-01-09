import React from "react";
import styled from "@emotion/styled";

import * as styles from "../../styles";

interface Props {
  notifications: {
    id: string;
    title: string;
    body?: string;
  }[];
  onNotificationClose: (id: string) => void;
}

const Container = styled.div({
  position: "relative",
  overflow: "hidden"
});

const Notifications = styled.div({
  position: "fixed",
  zIndex: 100000,
  right: 20,
  bottom: 20,
  "& > *:not(:last-child)": {
    marginTop: 20
  }
});

const Notification = styled.div({
  borderRadius: 6,
  backgroundColor: styles.black,
  color: styles.white,
  minWidth: 160,
  maxWidth: 240,
  boxShadow: "0 1px 6px 0 rgba(0, 0, 0, 0.6)"
});

const CloseButton = styled.button({
  width: 40,
  height: 40,
  padding: 10,
  color: styles.white,
  backgroundColor: "rgba(255, 255, 255, 0)",
  border: 0,
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.15)"
  },
  "&:focus": {
    outline: "none",
    boxShadow: "inset 0 0 0 4px rgba(255, 255, 255, 0.15)"
  }
});

const NotificationBody = styled.p({
  padding: 10,
  margin: 0,
  borderTop: `1px solid rgba(255, 255, 255, 0.15)`
});

const NotificationTitle = styled.div({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  height: 40,
  "& > p": {
    margin: 0,
    padding: "0 10px",
    fontWeight: 700
  }
});

const x = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const Layout: React.SFC<Props> = props => {
  const { notifications, onNotificationClose, children, ...rest } = props;
  return (
    <Container {...rest}>
      {children}
      <Notifications>
        {notifications.map(notification => (
          <Notification key={notification.id}>
            <NotificationTitle>
              <p>{notification.title}</p>
              <CloseButton
                onClick={() => {
                  onNotificationClose(notification.id);
                }}
              >
                {x}
              </CloseButton>
            </NotificationTitle>
            {notification.body && (
              <NotificationBody>{notification.body}</NotificationBody>
            )}
          </Notification>
        ))}
      </Notifications>
    </Container>
  );
};

export default Layout;
