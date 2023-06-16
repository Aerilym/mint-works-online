import {
  faCircle,
  faFeatherPointed,
  faGear,
  faLeaf,
  faScrewdriver,
  faScroll,
  faStar,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import { LocationConstructor } from 'mint-works/dist/location';

interface LocationProps {
  location: LocationConstructor;
  className?: string;
}

const iconProps = {
  className: 'h-8 w-8',
  styles: {
    color: '#ffffff',
    fill: 'white',
    stroke: '#5e5e5e',
    strokeWidth: '20px',
  },
};

const coinProps = {
  className: 'h-5 w-5',
  styles: {
    display: 'inline',
    strokeWidth: '32px',
  },
};

const inlineStyles = {
  marginRight: '4px',
  marginTop: '-4px',
};

export function Location({ location, className }: LocationProps) {
  const {
    name,
    mappedAction,
    type,
    effect,
    ownerUpkeep,
    slotBasePrice,
    numberOfSlots,
    startClosed,
    startingSlots,
  } = location;
  const color = 'bg-mintCard-deed';

  return (
    <div
      style={{
        width: '340px',
        height: '210px',
      }}
      className={clsx(
        'flex flex-row justify-between space-x-3 rounded bg-mintCard-background p-4 text-center shadow',
        className
      )}
    >
      <div className={clsx('flex h-full flex-col items-center justify-around rounded p-4', color)}>
        {startingSlots?.length === 0 ? (
          <p>BUILD DEED TO OPEN</p>
        ) : (
          [...Array(numberOfSlots)].map((_, idx) => (
            <div key={idx}>
              <h3
                className={clsx('absolute ml-3.5 mt-1 text-2xl font-bold')}
                style={{ color: '#f2e9d9' }}
              >
                {slotBasePrice === Infinity ? '*' : slotBasePrice}
              </h3>
              <FontAwesomeIcon
                icon={faCircle}
                className={clsx('h-10 w-10', color)}
                style={{
                  ...iconProps.styles,
                  ...coinProps.styles,
                  ...{
                    color: '#9CB8AE',
                    stroke: '#f2e9d9',
                    strokeWidth: '20px',
                    strokeDasharray: '50 50 50',
                  },
                }}
              />
            </div>
          ))
        )}
      </div>

      <div className="flex w-full flex-col justify-between space-y-3">
        <div className={clsx('flex flex-row justify-center rounded p-2', color)}>
          <div
            className="absolute flex flex-row"
            style={{ marginLeft: '-200px', marginTop: '-4px' }}
          >
            {getTypeIcon(type)}
          </div>
          <h3>{name}</h3>
        </div>

        <div className={clsx('flex h-full flex-col justify-between rounded p-2', color)}>
          <p>
            {effect
              ? effect.split(' ').map((word) =>
                  word === ':TOKEN:' ? (
                    <FontAwesomeIcon
                      key={word}
                      icon={faCircle}
                      className={clsx(iconProps.className, coinProps.className)}
                      style={{
                        ...iconProps.styles,
                        ...coinProps.styles,
                        ...inlineStyles,
                      }}
                    />
                  ) : word === ':STAR:' ? (
                    <FontAwesomeIcon
                      key={word}
                      icon={faStar}
                      className={clsx(iconProps.className, coinProps.className)}
                      style={{ ...iconProps.styles, ...coinProps.styles, ...inlineStyles }}
                    />
                  ) : word === ':CULTURE:' ? (
                    <FontAwesomeIcon
                      key={word}
                      icon={faLeaf}
                      className={clsx(iconProps.className, coinProps.className)}
                      style={{ ...iconProps.styles, ...coinProps.styles, ...inlineStyles }}
                    />
                  ) : word === ':DEED:' ? (
                    <FontAwesomeIcon
                      key={word}
                      icon={faScroll}
                      className={clsx(iconProps.className, coinProps.className)}
                      style={{ ...iconProps.styles, ...coinProps.styles, ...inlineStyles }}
                    />
                  ) : word === ':PRODUCTION:' ? (
                    <FontAwesomeIcon
                      key={word}
                      icon={faGear}
                      className={clsx(iconProps.className, coinProps.className)}
                      style={{ ...iconProps.styles, ...coinProps.styles, ...inlineStyles }}
                    />
                  ) : word === ':UTILITY:' ? (
                    <FontAwesomeIcon
                      key={word}
                      icon={faScrewdriver}
                      className={clsx(iconProps.className, coinProps.className)}
                      style={{ ...iconProps.styles, ...coinProps.styles, ...inlineStyles }}
                    />
                  ) : word === 'Upkeep:' ? (
                    <span key={word} className="font-bold">
                      {word}{' '}
                    </span>
                  ) : (
                    `${word} `
                  )
                )
              : ''}
          </p>

          <div className="font-white flex items-center justify-center">
            <p>
              {ownerUpkeep
                ? ownerUpkeep.split(' ').map((word) =>
                    word === ':TOKEN:' ? (
                      <FontAwesomeIcon
                        key={word}
                        icon={faCircle}
                        className={clsx(iconProps.className, coinProps.className)}
                        style={{
                          ...iconProps.styles,
                          ...coinProps.styles,
                          ...inlineStyles,
                        }}
                      />
                    ) : word === ':STAR:' ? (
                      <FontAwesomeIcon
                        key={word}
                        icon={faStar}
                        className={clsx(iconProps.className, coinProps.className)}
                        style={{ ...iconProps.styles, ...coinProps.styles, ...inlineStyles }}
                      />
                    ) : word === ':CULTURE:' ? (
                      <FontAwesomeIcon
                        key={word}
                        icon={faLeaf}
                        className={clsx(iconProps.className, coinProps.className)}
                        style={{ ...iconProps.styles, ...coinProps.styles, ...inlineStyles }}
                      />
                    ) : word === ':DEED:' ? (
                      <FontAwesomeIcon
                        key={word}
                        icon={faScroll}
                        className={clsx(iconProps.className, coinProps.className)}
                        style={{ ...iconProps.styles, ...coinProps.styles, ...inlineStyles }}
                      />
                    ) : word === ':PRODUCTION:' ? (
                      <FontAwesomeIcon
                        key={word}
                        icon={faGear}
                        className={clsx(iconProps.className, coinProps.className)}
                        style={{ ...iconProps.styles, ...coinProps.styles, ...inlineStyles }}
                      />
                    ) : word === ':UTILITY:' ? (
                      <FontAwesomeIcon
                        key={word}
                        icon={faScrewdriver}
                        className={clsx(iconProps.className, coinProps.className)}
                        style={{ ...iconProps.styles, ...coinProps.styles, ...inlineStyles }}
                      />
                    ) : word === 'Upkeep:' ? (
                      <span key={word} className="font-bold">
                        {word}{' '}
                      </span>
                    ) : (
                      `${word} `
                    )
                  )
                : ''}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

const getTypeIcon = (type: string) => {
  const extraStyles = {
    marginLeft: '-12px',
  };
  switch (type) {
    case 'Core':
      return (
        <FontAwesomeIcon
          icon={faFeatherPointed}
          style={{ ...iconProps.styles, ...extraStyles }}
          className={iconProps.className}
        />
      );
    case 'Deed':
      return (
        <FontAwesomeIcon
          icon={faScroll}
          style={{ ...iconProps.styles, ...extraStyles }}
          className={iconProps.className}
        />
      );
    default:
      return (
        <FontAwesomeIcon
          icon={faCircle}
          className={iconProps.className}
          style={{ ...iconProps.styles }}
        />
      );
  }
};
