import { BlackBoxMap } from "../visuals/BlackBoxDataMap";

import { DbConn } from "../DbConn";

function MainAppPage(): JSX.Element {
  return <BlackBoxMap data={new DbConn()} />;
}

export default MainAppPage;
