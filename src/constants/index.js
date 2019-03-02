import _ from "lodash";

const mockArray = () => _.times(8, index => `Item ${ index + 1 }`);

const mockGroups = () => {
  const groups = _.times(4, index => `Group ${ index + 1 }`);
  return _.reduce(groups, (obj, group, index) => ({
    ...obj,
    [group]: _.times(_.random(2,4), ind => `${group} Item ${ ind + 1 }`)
  }), {});
}

export const mockedData = {
  array: mockArray(),
  groups: mockGroups()
}
