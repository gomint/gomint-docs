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

### pom.xml Setup

Before you begin writing a plugin, you will need a ```pom.xml``` for the plugin. It is pertinent that this file be included.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <!-- Here is where you will substitute your plugin's information -->
    <groupId>io.gomint.testplugin</groupId>
    <artifactId>gomint-testplugin</artifactId>
    <version>1.0-SNAPSHOT</version>

    <!-- Here is where you will substitute your plugin's name and description -->
    <name>GoMint Test Plugin</name>
    <description>A plugin to test and see GoMint's API design</description>

    <dependencies>
        <!-- This is the GoMint API Maven Library which is necessary to create a plugin -->
        <dependency>
            <groupId>io.gomint</groupId>
            <artifactId>gomint-api</artifactId>
            <version>1.0.0-SNAPSHOT</version>
            <scope>provided</scope>
        </dependency>
    </dependencies>

    <build>
        <resources>
            <resource>
                <directory>${pom.basedir}/src/main/resources</directory>
                <filtering>true</filtering>
                <includes>
                    <include>*.*</include>
                </includes>
            </resource>
        </resources>
    </build>

</project>
```

## Step One - The ```Plugin``` Type

All plugins for the GoMint server contain a class extending ```io.gomint.plugin.Plugin```
where the initialization and cleanup of the plugin will take place, as well as the
registration of event handlers, new logic, etc. In lieu of a ```main()``` method, the plugin management system handles the initialization of plugins, so it is important that the annotations and types are setup correctly.

```java
package io.gomint.testplugin;

import io.gomint.plugin.Plugin;

// The class MUST extend Plugin. It is common for new users to write
// 'JavaPlugin', as they are coming from Bukkit/Spigot.
public class TestPlugin extends Plugin {}
```

## Step Two - The Annotations

Rather than use a configuration file that is packed into the JAR file to describe the organization of the plugin, GoMint utilizes annotations in the ```Plugin``` type for your plugin. These allow you to set parameters and descriptive elements for your plugin and are required for your plugin to load correctly.

Annotations:

| Annotation | Type            | Value                     | See Also                                                                              |
|------------|-----------------|---------------------------|---------------------------------------------------------------------------------------|
| PluginName | String          | Your plugin's name        |                                                                                       |  
| Version    | int, int        | ```major```, ```minor```  |                                                                                       |
| Startup    | StartupPriority | See Enums                 | [JavaDoc](https://janmm14.de/static/gomint/index.html?gomint.api/module-summary.html) |   

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

## ```Plugin``` Available Methods

The following methods are inherited from ```Plugin``` and can be used to install event handlers, listeners, and setup your plugin:

* ```onInstall()``` - Invoked when the plugin enters the runtime stage.
* ```onStartup()``` - Invoked when the plugin has been installed.
* ```onUninstall()``` - Invoked when the plugin has been uninstalled.
* ```isInstalled()``` - Can be invoked to determine if the plugin has been installed yet.
* ```registerCommand(io.gomint.command.Command)``` - Invoke to register your own commands.
* ```registerListener(io.gomint.event.EventListener)``` - Invoke to register your own event listeners.
* ```unregisterListener(io.gomint.event.EventListener)``` - Invoke to remove an event listener.
* ```getDataFolder()``` - Returns the data folder for this plugin as a File object.
* ```getPluginManager()``` - Returns the plugin manager of the GoMint server.
* ```getName() ``` - Returns the name of this plugin.
* ```getVersion()``` - Returns the version of this plugin.
* ```getLogger()``` - Returns the Logger of this plugin.
* ```getScheduler()``` - Returns the plugin scheduler.
* ```getServer()``` - Returns an instance of the GoMint server.
