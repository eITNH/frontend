import React from 'react';
import PropTypes from 'prop-types';

const baseColors = [
  [244, 67, 54],
  [233, 30, 99],
  [156, 39, 176],
  [103, 58, 183],
  [63, 81, 181],
  [33, 150, 243],
  [3, 169, 244],
  [0, 188, 212],
  [0, 150, 136],
  [76, 175, 80],
  [255, 193, 7],
  [255, 152, 0],
  [255, 87, 34],
  [121, 85, 72],
  [158, 158, 158],
  [96, 125, 139],
];

const lightModifier = 20;
const variationTotal = 10;

const getBaseColor = (defaultValue) => {
  let foundBaseColor = baseColors[0];
  baseColors.forEach((baseColor) => {
    for (let variation = 0; variationTotal > variation; variation += 1) {
      const newColor = [];

      for (let x = 0; x < baseColor.length; x += 1) {
        let modifiedColor = Number(baseColor[x]);
        modifiedColor -= 100;
        modifiedColor += lightModifier * variation;

        if (modifiedColor <= 0) {
          modifiedColor = 0;
        } else if (modifiedColor >= 255) {
          modifiedColor = 255;
        }

        newColor.push(modifiedColor);
      }
      if (defaultValue.join() === newColor.join()) {
        foundBaseColor = baseColor;
        break;
      }
    }
    return null;
  });
  return foundBaseColor;
};

const lightenColor = (color, times) => {
  const newColor = [];

  for (let x = 0; x < color.length; x += 1) {
    let modifiedColor = Number(color[x]);
    modifiedColor -= 100;
    modifiedColor += lightModifier * times;

    if (modifiedColor <= 0) {
      modifiedColor = 0;
    } else if (modifiedColor >= 255) {
      modifiedColor = 255;
    }

    newColor.push(modifiedColor);
  }
  return newColor;
};

const ColorPicker = (props) => {
  const [activeBaseColor, setActiveBaseColor] = React.useState(() => {
    if (props.defaultValue) {
      const defaultColor = props.defaultValue
        .replace('rgb(', '')
        .replace(')', '')
        .split(',');
      return getBaseColor(defaultColor);
    }
    return baseColors[0];
  });

  const [activeColor, setActiveColor] = React.useState(() => {
    if (props.defaultValue) {
      const defaultColor = props.defaultValue
        .replace('rgb(', '')
        .replace(')', '')
        .split(',');
      return defaultColor;
    }
    return baseColors[0];
  });

  const onChangeColor = React.useRef(props.onChangeColor);

  React.useEffect(() => {
    const color = `rgb(${activeColor.join()})`;
    onChangeColor.current(color);
  }, [activeColor, onChangeColor]);

  return (
    <div
      className="ColorPicker-activeColor"
      style={{
        backgroundColor: `rgb(${activeColor})`,
      }}
    >
      <div className="ColorPicker-title">Choose a color:</div>
      <div className="ColorPicker">
        <div
          className="ColorPicker-arrow"
          style={{
            color: `rgb(${activeColor})`,
          }}
        />
        <div className="ColorPicker-baseColors">
          {baseColors.map((baseColor) => {
            const isActive = baseColor.join() === activeBaseColor.join();
            return (
              <button
                type="button"
                key={baseColor.join()}
                className={`ColorPicker-color ${isActive ? 'is-active' : ''}`}
                style={{
                  backgroundColor: `rgb(${baseColor})`,
                }}
                onClick={() => {
                  setActiveColor(() => {
                    return baseColor;
                  });
                  setActiveBaseColor(() => {
                    return baseColor;
                  });
                }}
                aria-label={`rgb(${baseColor})`}
              />
            );
          })}
        </div>
        <div className="ColorPicker-variedColors">
          {[...Array(variationTotal)].map((_, key) => {
            const color = lightenColor(activeBaseColor, key);
            const isActive = color.join() === activeColor.join();
            return (
              <button
                type="button"
                key={color.join()}
                className={`ColorPicker-colorVariation ${
                  isActive ? 'is-active' : ''
                }`}
                style={{
                  backgroundColor: `rgb(${color})`,
                }}
                onClick={() => {
                  setActiveColor(() => {
                    return color;
                  });
                }}
                aria-label={`rgb(${color})`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

ColorPicker.propTypes = {
  onChangeColor: PropTypes.func,
  defaultValue: PropTypes.string,
};

ColorPicker.defaultProps = {
  defaultValue: null,
  onChangeColor: () => {
    return null;
  },
};

export default ColorPicker;
