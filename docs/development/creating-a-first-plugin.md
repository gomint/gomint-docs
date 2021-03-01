---
id: creating-first-plugin
title: Creating Your First Plugin
sidebar_label: Creating Your First Plugin
---

## Prerequisites

1. An understanding of the Java programming language is necessary.
2. Follow the [Getting Started guide](getting-started.md) to set up the project in your Java IDE (like IntelliJ IDEA or Eclipse).

A test plugin has been created in the GoMint repository and can be browsed [here](https://github.com/gomint/GoMint/tree/master/gomint-test-plugin/src/main/java/io/gomint/testplugin) for another example of what we will be creating.

## Step One - The ```Plugin``` Type

All plugins for the GoMint server contain a class extending [```io.gomint.plugin.Plugin```](https://janmm14.de/static/gomint/index.html?gomint.api/io/gomint/plugin/Plugin.html)
where the initialization and cleanup of the plugin will take place, as well as the
registration of event handlers, new logic, etc. In lieu of a ```main()``` method, the plugin management system handles the initialization of plugins, so it is important that the annotations and types are setup correctly.

:::info
The class in your plugin extending `Plugin` is often also referred to as *main class* of your plugin.
:::

```java
package me.plugincrafter.demo;

import io.gomint.plugin.Plugin;

// The class MUST extend Plugin. It is common for new users to write
// 'JavaPlugin', as they are coming from Bukkit/Spigot, but here it is just 'Plugin'.
public class TestPlugin extends Plugin {}
```

## Step Two - The Annotations

Rather than use a configuration file that is packed into the JAR file to describe the organization of the plugin, GoMint utilizes annotations in the ```Plugin``` type for your plugin. These allow you to set parameters and descriptive elements for your plugin and are required for your plugin to load correctly.

Annotations:

| Annotation | Type            | Value                                                                                                               |
|------------|-----------------|---------------------------------------------------------------------------------------------------------------------|
| PluginName | String          | Your plugin's name                                                                                                  |
| Version    | int, int        | ```major```, ```minor```                                                                                            |
| Startup    | StartupPriority | See Enum in [JavaDoc](https://janmm14.de/static/gomint/index.html?gomint.api/io/gomint/plugin/StartupPriority.html) |

```java
package me.plugincrafter.demo;

import io.gomint.plugin.Plugin;
import io.gomint.plugin.PluginName;
import io.gomint.plugin.Startup;
import io.gomint.plugin.StartupPriority;
import io.gomint.plugin.Version;

@PluginName("TestPlugin")
@Version(major = 1, minor = 0)
@Startup(StartupPriority.STARTUP)
public class TestPlugin extends Plugin {}
```

## Step Three - GoMint API philosophies and differences to other server software

GoMint is one of the first Minecraft server softwares which have built in world multithreading - each world has its own main thread.
This means that many actions to worlds and entites need to run in the world's thread.

Additionally GoMint provides easy-to-use API for plugins to handle the world multithreading and [restrict plugins to certain worlds](../get-started/plugin-world-restriction.md), which **every** plugin should obey to.

## ```Plugin``` Available Methods

The following methods are inherited from [```Plugin```](https://janmm14.de/static/gomint/index.html?gomint.api/io/gomint/plugin/Plugin.html) and can be used to install event handlers, listeners, and setup your plugin:

* ```onInstall()``` - Invoked when the plugin enters the runtime stage. Meant to be overriden.
* ```onUninstall()``` - Invoked when the plugin has been uninstalled. Meant to be overriden.
* ```onStartup()``` - Invoked when the plugin has been installed. Can be overridden if needed.
* ```isInstalled()``` - Can be invoked to determine if the plugin has been installed yet.
* ```registerCommand(io.gomint.command.Command)``` - Invoke to register your own commands.
* ```registerActiveWorldsListener(io.gomint.event.EventListener)``` - Invoke to register your own event listeners, limited to the [worlds your plugin should be active in](../get-started/plugin-world-restriction.md).
* ```registerListener(io.gomint.event.EventListener)``` - Invoke to register your own global event listeners.
* ```registerListener(io.gomint.event.EventListener, Predicate<io.gomint.event.Event>)``` - Invoke to register your own custom-limited event listeners.
* ```unregisterListener(io.gomint.event.EventListener)``` - Invoke to remove an event listener.
* ```activeInWorld(io.gomint.world.World)``` - Returns whether the plugin should be active in the given world.
* ```eventInActiveWorlds(io.gomint.event.Event)``` - Returns whether the plugin should be active in the given world.
* ```activeWorldsSnapshot()``` - Returns a set of _currently_ loaded worlds where the plugin should be active in. Do **not** save it for later use.
* ```activeWorldsPlayers()``` - Returns a set of players in your plugin's active worlds
* ```activeWorldsPlayers(Consumer<io.gomint.entity.EntityPlayer>)``` - Calls the given consumer for every player in your plugin's active worlds on the world's thread
* ```dataFolder()``` - Returns the data folder for this plugin as a File object.
* ```pluginManager()``` - Returns the plugin manager of the GoMint server.
* ```name() ``` - Returns the name of this plugin.
* ```version()``` - Returns the version of this plugin.
* ```logger()``` - Returns the Logger of this plugin.
* ```scheduler()``` - Returns the plugin scheduler.
* ```server()``` - Returns an instance of the GoMint server.

## Next up

[Create your first command](creating-your-first-command.md)
[Create your first event listener](creating-your-first-event-listener.md)
