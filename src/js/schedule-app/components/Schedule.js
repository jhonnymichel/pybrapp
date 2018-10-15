import React from 'react';
import map from 'lodash/map';
import reduce from 'lodash/reduce';
import classNames from 'classnames';
import { Sticky, StickyContainer } from 'react-sticky';
import DayMenu from './DayMenu';
import DaySeparator from './DaySeparator';
import ScrollNavigation from 'scroll-navigation-menu';
import Events from './Events';
import Transition from 'react-transition-group/Transition';
import { getFormattedTime } from 'app/schedule-app/utils';
import { FilterBox, CategoryFilter, EventTypeFilter } from './filters';

class Schedule extends React.Component {
  get styles() {
    const advancedFilters = document.querySelector('.advanced-filters');
    const translate = advancedFilters
      ? advancedFilters.getBoundingClientRect().height
      : 0;
    return {
      default: {
        transition: 'transform 300ms ease-out',
        transform: `translateY(0)`
      },
      entering: {
        transform: `translateY(${translate}px)`
      },
      entered: {
        transform: `translateY(${translate}px)`
      }
    }
  }

  get filtersStyles()  {
    return {
      default: {
        transformOrigin: 'center top',
        overflow: 'hidden',
        pointerEvents: 'none',
        transition: `all 300ms ease-in-out`,
        transform: `translateY(-100%)`,
        opacity: 0
      },
      entering: {
        transform: 'translateY(0)',
        opacity: 1,
      },
      entered: {
        pointerEvents: 'auto',
        transform: 'translateY(0)',
        opacity: 1,
      }
    }
  }

  renderDay(day, label) {
    if (day.length) {
      return (
        <div id={`day${label}`} >
          <DaySeparator day={label}/>
          {day.map(events => (
            <Events scheduleInDate={events} key={getFormattedTime(events.date)} />
          ))}
        </div>
      )
    }
  }

  componentDidMount() {
    const anchorsOffset = document.querySelector('.filters').getBoundingClientRect().height;
    this.anchors = new ScrollNavigation({
      offset: -anchorsOffset
    });
    setTimeout(this.anchors.start.bind(this.anchors), 300);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.store.days) {
      let items = 0;
      for (let key in this.props.store.days) {
        items += this.props.store.days[key].length;
      }

      if (items !== this.amountOfDays) {
        this.amountOfDays = items;
        this.anchors.scrollTo('.schedule-page');
      }
    }
  }

  render() {
    const { store } = this.props;
    const stickyOffset = 0;//document.querySelector('.header__nav').getBoundingClientRect().height;
    return (
        <Transition timeout={300} in={store.isShowingAdvancedFilters}>
          { animationState => (
            <React.Fragment>
              <div className="filters-container">
                <div
                  className="filters"
                >
                  <DayMenu days={store.days} />
                  <FilterBox
                    animationState={ animationState }
                    value={store.searchFilter}
                    onClick={store.actions.toggleAdvancedFilters}
                    onChange={store.actions.onSearchFilterChange}
                    isPopoverOpened={store.isShowingAdvancedFilters}
                  >
                  </FilterBox>
                </div>
                <div className="advanced-filters" style={{
                  ...this.filtersStyles.default,
                  ...this.filtersStyles[animationState]
                }}>
                  <header className="app-bar">
                    <button
                      onClick={store.actions.toggleAdvancedFilters}
                      className="back-button"
                    >
                      <i className="material-icons">arrow_back_ios</i>
                    </button>
                    <h2>Filtrar</h2>
                  </header>
                  <h3>Categoria</h3>
                  <CategoryFilter
                    categories={store.talksCategories}
                    filter={store.categoryFilter}
                    onChange={store.actions.onCategoryFilterChange}
                  />
                  <h3>Tipo</h3>
                  <EventTypeFilter
                    types={store.eventTypes}
                    filter={store.typeFilter}
                    onChange={store.actions.onTypeFilterChange}
                  />
                </div>
              </div>
              <div>
                {store.isListEmpty && <p className="empty-message">Nenhum evento encontrado.</p>}
                {map(store.days, (day, label) => (
                  <React.Fragment key={label}>
                    {this.renderDay(day, label)}
                  </React.Fragment>
                  ))}
              </div>
              <p class="schedule_subtitle">
                *Programação sujeita a alteração sem aviso prévio*
              </p>
          </React.Fragment>
          )}

        </Transition>
    )
  }
}

export default Schedule;
