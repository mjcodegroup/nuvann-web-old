import React from 'react'
import './styles.scss'

export default function BaseSelect() {
    return (
    <div className="b-select-wrap">
        <select className="form-control b-select">
          <option>Gender</option>
          <option>Male</option>
          <option>Female</option>
        </select>
      </div>
    )
}
