---
id: creating-first-plugin
title: Creating Your First Plugin
sidebar_label: Creating Your First Plugin
---

## Prerequisites

1. Follow the ["API Getting Started" guide](/docs/api/api-getting-started) and
install the API into your classpath.
2. An understanding of the Java programming language is necessary.
3. A test plugin has been created in the GoMint repository and can be browsed [here](https://github.com/gomint/GoMint/tree/master/gomint-test-plugin/src/main/java/io/gomint/testplugin) for another example of what we will be creating.

## Step One - The ```Plugin``` Type

All plugins for the GoMint server contain a class extending ```io.gomint.plugin.Plugin```
where the initialization and cleanup of the plugin will take place, as well as the
registration of event handlers, new logic, etc. In lieu of a ```main()``` method, the plugin management system handles the initialization of plugins, so it is important that the annotations and types are setup correctly.

```java
package me.plugincrafter.Demo;

import io.gomint.plugin.Plugin;

// The class MUST extend Plugin. It is common for new users to write
// 'JavaPlugin', as they are coming from Bukkit/Spigot.
public class DemoMain extends Plugin { }
```

## Step Two - The Annotations

Rather than use a configuration file that is packed into the JAR file to describe the organization of the plugin, GoMint utilizes annotations in the ```Plugin``` type for your plugin. These allow you to set parameters and descriptive elements for your plugin and are required for your plugin to load correctly.

Annotations:

| Annotation | Type            | Value                     | See Also                                                                              |
|------------|-----------------|---------------------------|---------------------------------------------------------------------------------------|
| PluginName | String          | Your plugin's name        |                                                                                       |  
| Version    | Int, Int        | ```major```, ```minor```  |                                                                                       |
| Startup    | StartupPriority | See Enums                 | [JavaDoc](https://janmm14.de/static/gomint/index.html?gomint.api/io/gomint/plugin/StartupPriority.html) |   
