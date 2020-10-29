import React, { memo } from "react";
import PropTypes from "prop-types";
import { Grid, Skeleton } from "../../../components";
import Card from "./Card";

function Board({ data, intl }) {
  const { cases, todayDeaths, recovered, deaths, todayCases } = data;

  const getValue = (value) =>
    value ? (
      intl.get("number", { price: value })
    ) : (
      <Skeleton variant="text" width={182} height={48} />
    );

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} md={3}>
        <Card
          value={getValue(cases)}
          label={intl.get("cases")}
          color="#5d78ff"
        />
      </Grid>
      <Grid item xs={12} md={3}>
        <Card
          value={getValue(todayDeaths)}
          label={intl.get("todayDeaths")}
          color="#f7b829"
        />
      </Grid>
      <Grid item xs={12} md={3}>
        <Card
          value={getValue(todayCases)}
          label={intl.get("todayCases")}
          color="#000"
        />
      </Grid>
      <Grid item xs={12} md={3}>
        <Card
          value={getValue(deaths)}
          label={intl.get("deaths")}
          color="#e95078"
        />
      </Grid>
      <Grid item xs={12} md={3}>
        <Card
          value={getValue(recovered)}
          label={intl.get("recovered")}
          color="#67c887"
        />
      </Grid>
    </Grid>
  );
}

export default memo(Board);
