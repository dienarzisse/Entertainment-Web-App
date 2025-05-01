import React from "react";

import Home from "./components/Home";
import DetailedView from "./components/DetailedView";
import MediaComponent from "./components/MediaComponent";

const Paths = () => {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/:mediaType/:category" exact component={MediaComponent} />
      <Route path="/:mediaType/:category/detail" component={DetailedView} />
    </Switch>
  );
};

export default Paths;
