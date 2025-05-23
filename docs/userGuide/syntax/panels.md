{% from "userGuide/components/advanced.md" import slot_info_trigger %}

## Panels

**Panel is a flexible container that supports collapsing and expanding its content. It is expandable by default.**

<include src="codeAndOutput.md" boilerplate >
<variable name="highlightStyle">html</variable>
<variable name="code">
<panel header="This is your header for a Panel, click me to expand!">
<markdown>_markdown_</markdown>
plain text ...
</panel>
</variable>
</include>

**With `minimized` attribute, panel is minimized into an inline block element. The `alt` attribute is for you to specify the minimized block header.**

<include src="codeAndOutput.md" boilerplate >
<variable name="highlightStyle">html</variable>
<variable name="code">
<panel header="How to cultivate a tomato plant at home" alt="Tomatoes" minimized>
  Lorem ipsum ...
</panel>
</variable>
</include>

**With `expanded` attribute, you can set the panels to be expanded when loaded in.**

<include src="codeAndOutput.md" boilerplate >
<variable name="highlightStyle">html</variable>
<variable name="code">
<panel header="Have your readers click less to see the Panel's contents" expanded>
  Lorem ipsum ...
</panel>
</variable>
</include>

**With the `expand-headerless` attribute, you can hide the panel header when it is expanded.**

<include src="codeAndOutput.md" boilerplate >
<variable name="highlightStyle">html</variable>
<variable name="code">
<panel header="This header will only show when the Panel is collapsed" expand-headerless>
  Lorem ipsum ...
</panel>
</variable>
</include>

**With the `peek` attribute, you may showcase part of your content without expanding the panel.**

<include src="codeAndOutput.md" boilerplate >
<variable name="highlightStyle">html</variable>
<variable name="code">
<panel header="Give your readers a peek of the content without expanding Panel" peek>
  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
  magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
  consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
  Curabitur ornare ipsum eu ex congue egestas. Maecenas pretium nibh sed enim ornare finibus. Mauris quis metus 
  facilisis, mattis tellus nec, pulvinar mi. Quisque at vehicula lectus. Ut ac lacus mi. Donec mattis nec velit 
  eget tincidunt. Maecenas vel mauris mattis nisl tempor sollicitudin. Orci varius natoque penatibus et magnis 
  dis parturient montes, nascetur ridiculus mus. Duis tincidunt diam eu dolor pellentesque, eget dignissim tortor 
  pellentesque. 
</panel>
</variable>
</include>

**Panel provides many types that change its appearance.**

<include src="codeAndOutput.md" boilerplate >
<variable name="highlightStyle">html</variable>
<variable name="code">
<panel header="**light type panel (DEFAULT)**" type="light" minimized>
  ...
</panel>
<panel header="**dark type panel**" type="dark" minimized>
  ...
</panel>
<panel header="**primary type panel**" type="primary" minimized>
  ...
</panel>
<panel header="**secondary type panel**" type="secondary" minimized>
  ...
</panel>
<panel header="**info type panel**" type="info" minimized>
  ...
</panel>
<panel header="**danger type panel**" type="danger" minimized>
  ...
</panel>
<panel header="**warning type panel**" type="warning" minimized>
  ...
</panel>
<panel header="**success type panel**" type="success" minimized>
  ...
</panel>
<panel header="**seamless type panel**" type="seamless" minimized>
  ...
</panel>
<panel header="**minimal type panel**" type="minimal" minimized>
  ...
</panel>
</variable>
</include>

<box background-color="#C51E3A" color="white">
  
  :bulb: Seamless panels inherit the background colour and text colour of any parents!
  <br/>
  <panel type="seamless" header="This is an example seamless panel">
    This is its content.
  </panel>
</box>

**Show/Hide buttons using `no-switch`, `no-close`, or `no-minimized-switch`.**

<include src="codeAndOutput.md" boilerplate >
<variable name="highlightStyle">html</variable>
<variable name="code">
<panel header="**This minimized panel does not have a switch button**" minimized no-minimized-switch>
  ...
</panel>
<panel header="This panel does not have a switch button" no-switch>
  ...
</panel>
<panel header="This panel does not have a close button" no-close>
  ...
</panel>
<panel header="This panel does not have either buttons" no-close no-switch>
  ...
</panel>
</variable>
</include>

**Use markdown in the header (only inline level markdown are supported).**

<include src="codeAndOutput.md" boilerplate >
<variable name="highlightStyle">html</variable>
<variable name="code">
<panel header="**Bold text** :rocket: ![](https://markbind.org/images/logo-lightbackground.png =x20)" type="seamless">
  ...
</panel>
</variable>
</include>

**If `src` attribute is provided, the panel will take content from the `src` specified and add it to the Panel body.**

<include src="codeAndOutput.md" boilerplate >
<variable name="highlightStyle">html</variable>
<variable name="code">
<panel header="Content loaded in from 'src'" src="extra/loadContent.html#fragment" minimized></panel>
</variable>
</include>

<div id = "script_and_styles_warning">
<box type = "warning" header = "#### Global Effects of the Script and Styles from the Imported Externals">

Importing external resources that contains `script` or `styles` can inadvertently take global effects on your MarkBind website. Due to hoisting during processing, imported scripts and stylesheets affect the entire page. This could potentially alter its appearance and behavior beyond the intended scope.

For example, if a CSS file imported via such means styles headings to be red, this change will be reflected page-wide.

To safeguard against unintended consequences, consider directly incorporating the code or customizing styles to target specific elements or classes not used universally. This approach grants more precise control over your website's presentation and reduces the risk of unexpected changes.
</box>
</div>

**If `popup-url` attribute is provided, a popup button will be shown. If clicked, it opens the specified url in a new window.**

<include src="codeAndOutput.md" boilerplate >
<variable name="highlightStyle">html</variable>
<variable name="code">
<panel header="Try clicking on my pop-up button" popup-url="{{ baseUrl }}/userGuide/syntax/extra/loadContent.html">
  This panel has a popup.
</panel>
</variable>
</include>

<include src="includes.md#baseUrl-warning"/>

**If `preload` attribute is provided, the panel body will load the HTML when the page renders instead of after being expanded.**

<include src="codeAndOutput.md" boilerplate >
<variable name="highlightStyle">html</variable>
<variable name="code">
<panel header="Right click and inspect my HTML before expanding me!" src="extra/loadContent.html#fragment" preload>
  <p>You should be able to find this text before expanding the Panel.</p>
</panel>
</variable>
</include>

**You can nest Panels or other components within a Panel.**

<include src="codeAndOutput.md" boilerplate >
<variable name="highlightStyle">html</variable>
<variable name="code">
<panel header="Parent Panel">
  <panel header="Level 1 Nested Panel">
    <panel header="Level 2 Nested Panel">
      <box type="success">
        I'm a nested box
      </box>
      <panel header="Level 3 Nested Panel" type="minimal">
        minimal-type panel
      </panel>
    </panel>
  </panel>
  <panel header="Level 1 Nested Panel" type="info">
    Some Text
  </panel>
</panel>
</variable>
</include>

****Options****
Name | Type | Default | Description
--- | --- | --- | ---
header{{slot_info_trigger}} | `String` | `''` | The clickable text on the Panel's header. Supports MarkDown text.
alt{{slot_info_trigger}}| `String` | Panel header | The clickable text on the minimised Panel. Supports MarkDown text. When using slots, the slot name is `_alt`.
expandable | `Boolean`| `true` | Whether Panel is expandable.
expanded | `Boolean` | `false` | Whether Panel is expanded or collapsed when loaded in.
minimized | `Boolean` | `false` | Whether Panel is minimized.
expand-headerless | `Boolean` | `false` | Whether to hide the header text when the Panel is expanded.
peek | `Boolean` | `false` | Whether to show part of the content when the Panel is collapsed.
no-close | `Boolean` | `false` | Whether to show the close button.
no-switch | `Boolean` | `false` | Whether to show the expand switch.
no-page-break | `Boolean` | `false`| Prints the panel fully on a single page by moving it to a new page if needed.
bottom-switch | `Boolean` | `true` | Whether to show an expand switch at the bottom of the panel. Independent of no-switch.
popup-url | `String` | | The URL that the popup window will navigate to. The URL can be absolute or relative.
preload | `Boolean` | `false` | Whether the content is loaded immediately from `src`.
src | `String` | | The URL to the remote page to be loaded as the content of the panel.
type | `String` | `light` | The type or color scheme of the panel (single).<br>Supports: `light`, `dark`, `primary`, `secondary`, `info`, `success`, `warning`, `danger`, `seamless`, `minimal`.

<div id="short" class="d-none">

```html
<panel header="primary type panel" type="primary" >
  ...
</panel>
```
</div>

<div id="examples" class="d-none">
<panel header="minimal type panel" type="minimal" >
  ...
</panel>
<panel header="seamless type panel" type="seamless" >
  ...
</panel>
<panel header="info type panel" type="info" expanded>
  ...
</panel>
<panel header="danger type panel" type="danger" >
  ...
</panel>
<panel header="warning type panel" type="warning" >
  ...
</panel>
<panel header="success type panel" type="success" >
  ...
</panel>
<p/>
<panel header="light type panel (DEFAULT)" type="light" minimized>
  ...
</panel>
<panel header="dark type panel" type="dark" minimized>
  ...
</panel>
<panel header="primary type panel" type="primary" minimized>
  ...
</panel>
<panel header="secondary type panel" type="secondary" minimized>
  ...
</panel>


</div>
