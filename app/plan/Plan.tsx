import {
  faCircle,
  faGear,
  faLeaf,
  faScrewdriver,
  faScroll,
  faStar,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import type { Plan } from 'mint-works';

interface PlanProps {
  plan: Plan;
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

export function Plan({ plan, className }: PlanProps) {
  const { name, types, cost, description, baseStars } = plan;
  let color = '';
  switch (types[0] ?? '') {
    case 'Culture':
      color = 'bg-mintCard-culture';
      break;
    case 'Deed':
      color = 'bg-mintCard-deed';
      break;
    case 'Production':
      color = 'bg-mintCard-production';
      break;
    case 'Utility':
      color = 'bg-mintCard-utility';
      break;
  }

  return (
    <div
      style={{
        width: '210px',
        height: '340px',
      }}
      className={clsx(
        'flex flex-col justify-between rounded bg-mintCard-background p-4 text-center shadow',
        className
      )}
    >
      <div className={clsx('flex flex-row justify-center rounded p-2', color)}>
        <div className="absolute flex flex-row" style={{ marginLeft: '-150px', marginTop: '-4px' }}>
          {types.map((type) => getTypeIcon(type))}
        </div>
        <h3>{name}</h3>
      </div>

      <div className="flex items-center justify-center p-2">
        {[...Array(cost)].map((_, idx) => (
          <FontAwesomeIcon
            key={idx}
            icon={faCircle}
            className={clsx(iconProps.className, coinProps.className)}
            style={{
              ...iconProps.styles,
              ...coinProps.styles,
              ...{
                marginRight: '-4px',
                marginLeft: '-4px',
              },
            }}
          />
        ))}
      </div>

      <div className={clsx('flex h-full flex-col justify-between rounded p-2', color)}>
        <p>
          {description
            ? description.split(' ').map((word) =>
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
          {[...Array(baseStars)].map((_, idx) => (
            <FontAwesomeIcon
              key={idx}
              icon={faStar}
              className={iconProps.className}
              style={{ ...iconProps.styles }}
            />
          ))}
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
    case 'Culture':
      return (
        <FontAwesomeIcon
          icon={faLeaf}
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
    case 'Production':
      return (
        <FontAwesomeIcon
          icon={faGear}
          style={{ ...iconProps.styles, ...extraStyles }}
          className={iconProps.className}
        />
      );
    case 'Utility':
      return (
        <FontAwesomeIcon
          icon={faScrewdriver}
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
