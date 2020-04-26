import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/react-hooks';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbtack } from '@fortawesome/free-solid-svg-icons';
import { format, parse } from 'date-fns';

import { AddFavorite } from './AddFavorite.gql';
import { RemoveFavorite } from './RemoveFavorite.gql';

const CourseCard = (props) => {
  const [addFavorite] = useMutation(AddFavorite, {
    variables: {
      courseId: props.id,
    },
  });

  const [removeFavorite] = useMutation(RemoveFavorite, {
    variables: {
      courseId: props.id,
    },
  });

  return (
    <div className="CourseCard">
      <div className="CourseCard-Head">
        <div className="CourseCard-Title">{props.title}</div>
        <button
          type="button"
          onClick={() => {
            if (props.isFavorite) {
              removeFavorite();
            } else {
              addFavorite();
            }
          }}
          className={`CourseCard-Favoritebutton ${
            props.isFavorite ? 'is-Favorite' : ''
          }`}
        >
          <FontAwesomeIcon
            icon={faThumbtack}
            className="CourseCard-Favoritebutton-Icon"
          />
        </button>
      </div>
      <div className="CourseCard-Description">{props.teaser}</div>
      <div className="CourseCard-Infos">
        <div className="CourseCard-InfosInfo">
          <p className="CourseCard-InfosInfo-Label">From</p>
          <p className="CourseCard-InfosInfo-Value">
            {format(
              parse(props.start, 'yyyy-MM-dd HH:mm:ss', new Date()),
              'dd.MM.yyyy HH:mm',
            )}
          </p>
        </div>
        <div className="CourseCard-InfosInfo">
          <p className="CourseCard-InfosInfo-Label">Until</p>
          <p className="CourseCard-InfosInfo-Value">
            {format(
              parse(props.end, 'yyyy-MM-dd HH:mm:ss', new Date()),
              'dd.MM.yyyy HH:mm',
            )}
          </p>
        </div>
        <div className="CourseCard-InfosInfo CourseCard-InfosInfo--big">
          <p className="CourseCard-InfosInfo-Label">Professor</p>
          <p className="CourseCard-InfosInfo-Value">
            {props.professors.map((professor) => {
              return (
                <div key={professor.id}>
                  {professor.firstname} {professor.lastname}
                </div>
              );
            })}
          </p>
        </div>
        {props.categories.length > 0 && (
          <div className="CourseCard-InfosInfo CourseCard-InfosInfo--big">
            <p className="CourseCard-InfosInfo-Label">Categories</p>
            <div className="CourseCard-InfosInfo-Value">
              {props.categories.map((category) => {
                return (
                  <div
                    key={category.id}
                    className="CourseCard-InfosInfo-Value-Category"
                  >
                    <span
                      style={{ backgroundColor: category.color }}
                      className="CourseCard-InfosInfo-Value-CategoryDot"
                    />
                    {category.title}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
      <div className="CourseCard-Buttons">
        <NavLink
          className="CourseCard-ButtonsButton"
          to={`/course/${props.id}/`}
        >
          Learn more
        </NavLink>
        <NavLink
          className="CourseCard-ButtonsButton"
          to={`/course/${props.id}/join`}
        >
          Attend
        </NavLink>
      </div>
    </div>
  );
};

CourseCard.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  teaser: PropTypes.string,
  start: PropTypes.string,
  end: PropTypes.string,
  professors: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      firstname: PropTypes.string,
      lastname: PropTypes.string,
    }),
  ).isRequired,
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      color: PropTypes.string,
    }),
  ),
  isFavorite: PropTypes.bool.isRequired,
};

CourseCard.defaultProps = {
  teaser: '',
  start: '',
  end: '',
  categories: [],
};

export default CourseCard;
