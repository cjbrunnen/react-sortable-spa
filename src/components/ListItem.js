import React from "react";
import styled from "styled-components";
import OrgIcon from "../images/org-icon.png";
import Avatar from './Avatar'

const Item = styled.div`
  background-color: #fff6;
  cursor: pointer;
`;

const Name = styled.h5`
  color: black;
  font-size: 18px;
`;

const Org = styled.h5`
  color: grey;
  font-size: 16px;
`;

const OrgIconImg = styled.img`
  height: 20px;
  padding: 3px 5px 3px 0;
`;

const ListItem = ({ item, prepareAction }) => {
  return (
    <Item
      className="list-group-item"
      data-toggle="modal"
      data-target="#actionModal"
      id={`person-${item.id}`}
      key={item.id}
      onClick={() => prepareAction(item)}
    >
      <div className="d-flex w-100 justify-content-between">
        <div className="container">
          <div className="row">
            <div className="col-9">
              <div className="row">
                <Name className="mb-1">{item.name}</Name>
              </div>
              <div className="row">
                <OrgIconImg src={OrgIcon} alt="organisation icon" />
                <Org className="mb-1">{item.org_name}</Org>
              </div>
            </div>
            <div className="col-3">
                <Avatar name={item.name} />
            </div>
          </div>
        </div>
      </div>
    </Item>
  );
};

export default ListItem;
