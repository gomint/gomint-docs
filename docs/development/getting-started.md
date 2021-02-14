---
id: getting-started
title: IDE setup for GoMint plugin development
sidebar_label: IDE setup for GoMint plugin development
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This is a brief explanation to show you how to add gomint-api to your classpath to start writing gomint plugins.

There are multiple options available for this:

## Using a dependency management system

### Maven

This is the recommended way. Maven is not hard to learn and it makes dependency management really easy.

Before you begin writing a plugin, you will need a ```pom.xml``` for the plugin. It is pertinent that this file be included.

Example pom.xml file for maven:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <!-- Here is where you will substitute your plugin's information -->
    <groupId>io.gomint.demo.testplugin</groupId>
    <artifactId>myfirstplugin</artifactId>
    <version>1.0-SNAPSHOT</version>

    <!-- Here is where you will substitute your plugin's name and description -->
    <name>My first Plugin</name>
    <description>A demonstration and tutorial plugin for gomint's api</description>

    <repositories>
        <!-- This is the maven repository where gomint is published to  -->
        <repository>
            <id>ossrh</id>
            <url>https://oss.sonatype.org/content/repositories/snapshots</url>
        </repository>
    </repositories>

    <dependencies>
        <!-- This is the GoMint API Maven Library which is necessary to create a plugin -->
        <dependency>
            <groupId>io.gomint</groupId>
            <artifactId>gomint-api</artifactId>
            <version>1.0.0-SNAPSHOT</version>
            <scope>provided</scope>
        </dependency>
    </dependencies>
</project>
```

### Gradle

Here is the repository snippet:

<Tabs
  defaultValue="groovy"
  values={[
    { label: 'Groovy', value: 'groovy', },
    { label: 'Kotlin', value: 'kotlin', },
  ]
}>
<TabItem value="groovy">

```groovy
    maven { url "https://oss.sonatype.org/content/repositories/snapshots" }
```

</TabItem>
<TabItem value="kotlin">
    
```kotlin
    maven { url = uri("https://oss.sonatype.org/content/repositories/snapshots") }
```

</TabItem>
</Tabs>

and here is the dependencies snippet:

<Tabs
  defaultValue="groovy"
  values={[
    { label: 'Groovy', value: 'groovy', },
    { label: 'Kotlin', value: 'kotlin', },
  ]
}>
<TabItem value="groovy">

```groovy
    compile "io.gomint:gomint-api:1.0.0-SNAPSHOT"
```

</TabItem>
<TabItem value="kotlin">
    
```kotlin
    compile("io.gomint:gomint-api:1.0.0-SNAPSHOT")
```

</TabItem>
</Tabs>

## Downloading the API JARs manually

You can download the latest API jar here: https://ci.janmm14.de/job/public%7Emcbe%7Egomint/lastSuccessfulBuild/artifact/gomint-api/target/
Place this jar somewhere where you will not accidentally move or delete it, at best create a dedicated java dependencies folder.
You can additionally download sources or javadoc jar IF you are a little more experienced to also add them to to your IDE.

### Adding JARs to IntelliJ IDEA

Create a new java project in [IntelliJ IDEA](https://www.jetbrains.com/idea/download/#section=windows). See [here](https://www.jetbrains.com/help/idea/working-with-module-dependencies.html) for how to add a jar dependency to your project.

### Adding JARs to Eclipse

1. To begin, create a new Java Project in [Eclipse](https://www.eclipse.org/downloads/packages/), or click the name of the project
in the project explorer if you have already created it.
2. Click ```File->Properties```
3. Select "Java Build Path" from the list on the left.
4. Select "Classpath" from the list in the panel.
5. Select the button titled "Add External Jars"
6. Navigate to the JAR and select it.

Once you have completed these steps, the API should be installed into your
classpath in Eclipse and ready to use for creating plugins.

## Accessing the Javadoc

The GoMint API Javadoc can be found [here](https://s.janmm14.de/gomint-javadoc).
While not every method and class has been documented, the majority is.

## Next up

[Create your first plugin](creating-a-first-plugin.md)
