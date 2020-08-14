// @flow
import React from 'react'

type Props = {
  column: string,
  idKey?: string,
  item: Object,
  parentDataObject?: string,
  parentModule?: string,
  requestRedirectTo: (mode: string, module: string, id: number) => void,
  value: string | number | boolean,
}

const LinkToParentComponent = (props: Props) => {
  if (!props.value) {
    return null
  }

  const handleClick = (e) => {
    e.preventDefault()
    if (!props.parentModule) {
      const [key, id] = Object.keys(props.item).reduce(
        (acc, columnKey) => {
          if (typeof props.item[columnKey] === 'object') {
            return [columnKey, props.item[columnKey].id]
          }
          return acc
        },
        ['', 0],
      )
      props.requestRedirectTo('view', key, id)
    } else if (
      typeof props.item[props.parentModule] === 'object' ||
      typeof props.item[props.parentDataObject] === 'object'
    ) {
      let idKey = 'id'
      let dataKey = props.parentModule
      if (props.idKey) {
        idKey = props.idKey
      }
      if (props.parentDataObject) {
        dataKey = props.parentDataObject
      }
      props.requestRedirectTo('view', props.parentModule, props.item[dataKey][idKey])
    }
  }

  return (
    <span>
      <a href="#" onClick={handleClick}>
        {props.value}
      </a>
    </span>
  )
}

LinkToParentComponent.defaultProps = {
  idKey: '',
  parentDataObject: '',
  parentModule: '',
  requestRedirectTo: () => {},
}

export default LinkToParentComponent
