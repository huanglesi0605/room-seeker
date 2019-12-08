// display search results

import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { List } from "antd";

import styles from "assets/jss/material-kit-react/views/landingPageSections/teamStyle.js";

import NormalCard from "ourComponents/card/NormalCard.js";
const useStyles = makeStyles(styles);

export default function TeamSection(props) {
  const classes = useStyles();
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );

  const { searched, searchResults } = props;

  if (!searched) {
    return <div />;
  }

  if (searchResults.length === 0) {
    return (
      <div className={classes.section}>
        <h2 className={classes.title}>No results. T_T</h2>
      </div>
    );
  }

  // const totalPage = Math.floor(searchResults.length / 6);

  return (
    <div className={classes.section}>
      <h2 className={classes.title}>Search Results:</h2>
      <div>
        <List
          grid={{ gutter: 16, column: 3 }}
          dataSource={searchResults}
          renderItem={item => (
            <List.Item>
              <NormalCard
                title={item.title}
                description={item.description}
                price={item.price}
                propertyId={item.id}
                oneImage={item.oneImage}
                setWishlist={wishlist => {}}
              />
            </List.Item>
          )}
        />
      </div>
      <br />
      {/* <Pages style={{ text: "center" }} current={page} total={totalPage} /> */}
    </div>
  );
}
