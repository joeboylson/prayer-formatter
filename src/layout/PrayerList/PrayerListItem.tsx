import styled from "styled-components";
import { Prayer } from "../../database";
import { Link, useParams } from "react-router-dom";
import { Pages } from "../App";
import { compact } from "lodash";
import { useMemo } from "react";

const StyledPrayerListItem = styled.div`
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  height: 36px;
  align-items: center;
  display: grid;
  align-items: center;
  background-color: #eee;

  &:hover,
  &.active {
    background-color: #ddd;
  }

  a {
    color: #222222;
    text-decoration: none;
    padding: 0 16px;
    line-height: 36px;
  }
`;

const UnpublishedTag = styled.p`
  position: absolute;
  top: 0;
  right: 0;
  font-size: 10px;
  margin: 6px;
  padding: 0 8px;
  line-height: 24px;
  pointer-events: none;
  background-color: var(--blue-10);
  color: white;
  text-transform: uppercase;
  border-radius: 36px;
`;

interface _props {
  prayer: Prayer;
}

export default function PrayerListItem({ prayer }: _props) {
  const to = useMemo(() => {
    const { SELECTED_ADMIN_PRAYER, SELECTED_PRAYER } = Pages;
    const currentRoute = window.location.pathname;
    const route = currentRoute.includes("admin")
      ? SELECTED_ADMIN_PRAYER
      : SELECTED_PRAYER;
    return route.replace(":prayerId", prayer.id ?? "");
  }, [prayer]);

  const { prayerId } = useParams();

  const className = compact([prayerId === prayer.id ? "active" : null]).join(
    " "
  );

  return (
    <StyledPrayerListItem className={className}>
      <Link to={to}>{prayer.name ?? "No Name"}</Link>
      {!prayer.published && <UnpublishedTag>Not Published</UnpublishedTag>}
    </StyledPrayerListItem>
  );
}
