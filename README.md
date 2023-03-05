# React Dropdown/ Searchable Palette

## Define the prerequsites for it first

```tsx
export const items = [
  {
    name: "Select a period",
    value: "-",
  },
  {
    name: "Hourly",
    value: "hourly",
  },
  {
    name: "Weekly",
    value: "weekly",
  },
];

const [value, setValue] = useState<DropdownItemProps | undefined>(items[0]);
```

## Default dropdown menu (Basic select box)

```tsx
<FormDropdown
  className="max-w-[400px] m-auto"
  label="Salary Period"
  id="about"
  items={items}
  value={value}
  disabled={false}
  onChange={setValue}
/>
```

## Searchable command palette

```tsx
<FormDropdown
  className="max-w-[400px] m-auto"
  label="Salary Period"
  id="about"
  items={items}
  value={value}
  search={true}
  disabled={false}
  onChange={setValue}
/>
```
