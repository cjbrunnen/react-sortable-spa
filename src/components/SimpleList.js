import React, { useEffect, useState } from "react";
import { ReactSortable } from "react-sortablejs";
import axios from "axios";
import idx from "idx";
import styled from "styled-components";

import ListItem from "./ListItem";
import { PIPEDRIVE_URL_GET_PERSONS, apiGetPerson } from "../constants";
import ActionModal from "./ActionModal";

import "./SimpleList.css";

const AppTitle = styled.h1`
  text-align: left;
  font-size: 24px;
  margin-top: 20px;
`;

const AddNew = styled.div`
  padding: 0 20px;
  margin-top: 20px;
  display: flex;
  align-items: center;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background-color: #26292c;
    color: #fff;
  }
`;

const initialState = {
  name: "",
  phone: "",
  email: "",
};

const SimpleList = () => {
  const [list, setList] = useState([]);
  const [user, setUser] = useState(initialState);
  const [open, setOpen] = useState(false);

  const [isEdit, setIsEdit] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const [actionItem, setActionItem] = useState(initialState);

  // edit or update form fields in UI
  const handleChange = (event) => {
    if (isEdit) {
      setActionItem({
        ...actionItem,
        [event.target.name]: event.target.value,
      });
    } else {
      setUser({
        ...user,
        [event.target.name]: event.target.value,
      });
    }
  };

  const prepareAction = (item) => {
    setIsEdit(true);
    setActionItem(item);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isEdit) {
      const copyList = [...list];
      let index = copyList.findIndex((item) => item.id === actionItem.id);
      copyList[index] = actionItem;
      setList(copyList);

      const editUser = async function () {
        const personUrl = await apiGetPerson(actionItem.id);
        let personData = await axios.get(personUrl);

        personData.data.data = actionItem;

        // DEMO RESPONSE
        return console.log(
          "you updated a user: (see personData.data.data)",
          personData
        );
        // SEND PUT TO API HERE:
        // return await axios.put(personUrl, personData);
      };
      editUser();
    } else {
      setList([...list, user]);

      // DEMO RESPONSE
      console.log("you created a new user: ", user);
      // SEND POST TO API HERE:
      // return await axios.post(PIPEDRIVE_URL_GET_PERSONS, user);
    }

    setSuccess(true);
    setOpen(false)
    reset();
  };

  const handleDelete = (id) => {
    setList(list.filter((item) => item.id !== id));
    reset();
  };

  const reset = () => {
    document.getElementById("list-form").reset();
    setIsEdit(false);
    setUser(initialState);
    setActionItem(initialState);

    setTimeout(function () {
      setSuccess(false);
    }, 5000);
  };

  useEffect(() => {
    axios.get(PIPEDRIVE_URL_GET_PERSONS).then((res) => {
      setList(res.data.data);
    });
  }, []);

  const phone = idx(actionItem, (_) => _.phone[0].value) || null;
  const email = idx(actionItem, (_) => _.email[0].value) || null;

  const collapsed = open ? "collapse show" : "collapse";

  return (
    <>
      {isSuccess ? (
        <div
          className="alert alert-success alert-dismissible fade show"
          role="alert"
        >
          <strong>Success!</strong>
          <button
            type="button"
            className="close"
            data-dismiss="alert"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      ) : (
        ""
      )}
      <div className="d-flex w-100 justify-content-between">
        <AppTitle>People's List</AppTitle>
        <AddNew onClick={() => setOpen(!open)}>
          {open ? "Close" : "Add New Person"}
        </AddNew>
      </div>

      <form onSubmit={handleSubmit} id="list-form" className={collapsed}>
        <div className="form-row">
          <div className="col">
            <label htmlFor="first-name">First Name:</label>
            <input
              type="text"
              required
              className="form-control"
              id="first-name"
              name="first-name"
              defaultValue={actionItem.first_name}
              placeholder="First name..."
              onChange={handleChange}
            />
          </div>
          <div className="col">
            <label htmlFor="last-name">Last Name:</label>
            <input
              type="text"
              required
              className="form-control"
              id="last-name"
              name="last-name"
              defaultValue={actionItem.last_name}
              placeholder="Last name..."
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-row mt-2">
          <div className="col">
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              required
              className="form-control"
              id="email"
              name="email"
              defaultValue={email}
              placeholder="Email..."
              onChange={handleChange}
            />
          </div>
          <div className="col">
            <label htmlFor="phone">Phone:</label>
            <input
              type="text"
              required
              className="form-control"
              id="phone"
              name="phone"
              defaultValue={phone}
              placeholder="Phone..."
              onChange={handleChange}
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary mb-4 mt-2">
          Save
        </button>

        <button
          type="button"
          className="btn btn-secondary mb-4 ml-2 mt-2"
          onClick={reset}
        >
          Clear
        </button>
      </form>

      <hr className="mb-4" />

      <ReactSortable
        multiDrag
        id="people-list"
        className="list-group"
        chosenClass="chosen-list"
        list={list}
        setList={setList}
        animation={150}
      >
        {list &&
          list.map((item) => (
            <ListItem prepareAction={prepareAction} item={item} key={item.id} />
          ))}
      </ReactSortable>

      <ActionModal
        item={actionItem}
        handleDelete={handleDelete}
        setOpen={setOpen}
      />
    </>
  );
};

export default SimpleList;
