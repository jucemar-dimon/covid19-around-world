import React, { memo } from "react";

import LogoVirus from "../../../assets/images/virus.png";
import { makeStyles } from "@material-ui/core/styles";
import ShareIcon from "@material-ui/icons/Share";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import UpdateIcon from "@material-ui/icons/Update";

import {
  Card,
  CardHeader,
  Typography,
  Select,
  MenuItem,
  Avatar,
  IconButton,
} from "../../../components/index";
import COUNTRIES from "../../../commons/constants/countries";

import { CardPanelContentStyled, ItemStyled } from "./styles";

const navigatorHasShare = navigator.share;

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  titleLarge: {
    fontSize: 22,
    fontWeight: "bold",
  },
  titleSmall: {
    fontSize: 16,
    fontWeight: "bold",
  },

  titleMoreSmall: {
    fontSize: 14,
  },
}));

function Panel({ updatedAt, onChange, data, country, getCovidData, intl }) {
  const { recovered } = data;
  const classes = useStyles();

  const renderCountries = (country, index) => (
    <MenuItem key={`country-${index}`} value={country.value}>
      <ItemStyled>
        <div>{country.label}</div>
        <img src={country.flag} alt={`País-${country.label}`} />
      </ItemStyled>
    </MenuItem>
  );

  const textCovid19 = `País: ${country} - Recuperados: ${recovered}`;

  const copyInfo = () => {
    navigator.clipboard.writeText(textCovid19);
  };

  const shareInfo = () => {
    navigator.share({
      title: `Dados do COVID-19 - ${country}`,
      text: textCovid19,
      url: "https:covid19.com",
    });
  };

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar alt="Virus" src={LogoVirus} className={classes.large} />
        }
        action={
          navigatorHasShare ? (
            <IconButton aria-label={intl.get("btn-share")} onClick={shareInfo}>
              <ShareIcon />
            </IconButton>
          ) : (
            <IconButton aria-label={intl.get("btn-copy")} onClick={copyInfo}>
              <FileCopyIcon />
            </IconButton>
          )
        }
        title={
          <>
            <Typography color="primary" className={classes.titleLarge}>
              COVID19
            </Typography>
            <Typography className={classes.titleSmall}>
              Around the world
            </Typography>
          </>
        }
        subheader={
          <div style={{ display: "flex", alignItems: "center" }}>
            <UpdateIcon fontSize="small" style={{ color: "#67c887" }} />
            <Typography className={classes.titleMoreSmall}>
              {updatedAt}
            </Typography>
          </div>
        }
      />
      <CardPanelContentStyled>
        <div>
          <Typography variant="Body2" component="span" color="primary">
            {intl.get("header.title")}
          </Typography>

          <div className="pt-2">
            <Select onChange={onChange} value={country}>
              {COUNTRIES.map(renderCountries)}
            </Select>
          </div>
        </div>
      </CardPanelContentStyled>
    </Card>
  );
}

export default memo(Panel);
