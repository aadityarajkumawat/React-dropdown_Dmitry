# React Dropdown/ Searchable Palette

## Default dropdown menu (Basic select box)

```jsx
<FormDropdown
  className="max-w-[400px] m-auto"
  label="Salary Period"
  id="about"
  items={[
    {
      name: "Hourly",
      value: "hourly",
      rightText: "per hour",
      icon: <ClockIcon />,
    },
    {
      name: "Weekly",
      value: "weekly",
      rightText: "per hour",
      icon: <CloudIcon />,
    },
  ]}
  value={{
    name: "Weekly",
    value: "weekly",
  }}
  disabled={false}
  onChange={() => {}}
/>
```

## Searchable command palette

```jsx
<FormDropdown
  className="max-w-[400px] m-auto"
  label="Salary Period"
  id="about"
  items={[
    {
      name: "Hourly",
      value: "hourly",
      rightText: "per hour",
      icon: <ClockIcon />,
    },
    {
      name: "Weekly",
      value: "weekly",
      rightText: "per hour",
      icon: <CloudIcon />,
    },
  ]}
  value={{
    name: "Weekly",
    value: "weekly",
  }}
  search={true}
  keyboardTriggered={true} // enabling this will mount the control on hitting CMD + K, `completely optional`
  disabled={false}
  onChange={() => {}}
/>
```
