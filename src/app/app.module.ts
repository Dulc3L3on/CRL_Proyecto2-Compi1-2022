import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GlobalContainerModule } from './global-container/global-container.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CRL_File } from './Modelo/CRL_File';
import { Tool } from './Modelo/Tool/Tool';
import { Caster } from './Modelo/ObjetosAnalisis/Sentences/Function_Content/Content/Caster';

import { HierarchyStack } from './Modelo/Prev-Ejecucion/HierarchyStack';

import { Import } from './Modelo/ObjetosAnalisis/Sentences/Class_Content/Import';
import { Incertitude } from './Modelo/ObjetosAnalisis/Sentences/Class_Content/Incertitude';

import { Sentence } from './Modelo/ObjetosAnalisis/Sentences/Sentence';
import { Container } from './Modelo/ObjetosAnalisis/Sentences/Container';
import { GlobalContainer } from './Modelo/ObjetosAnalisis/Sentences/GlobalContainer';
import { LocalContainer } from './Modelo/ObjetosAnalisis/Sentences/LocalContainer';
import { Directive } from './Modelo/ObjetosAnalisis/Sentences/Directive';

import { Variable_Declaration } from './Modelo/ObjetosAnalisis/Sentences/Variable_Declaration';
import { Function } from './Modelo/ObjetosAnalisis/Sentences/Class_Content/Function';

import { Main } from './Modelo/ObjetosAnalisis/Sentences/Class_Content/Main';
import { Complex_Function } from './Modelo/ObjetosAnalisis/Sentences/Class_Content/Complex_Function';
import { Void_Function } from './Modelo/ObjetosAnalisis/Sentences/Class_Content/Void_Function';

import { Control_Sentence } from './Modelo/ObjetosAnalisis/Sentences/Function_Content/Control_Sentences/Control_Sentence';
import { If } from './Modelo/ObjetosAnalisis/Sentences/Function_Content/Control_Sentences/If';
import { Else } from './Modelo/ObjetosAnalisis/Sentences/Function_Content/Control_Sentences/Else';
 
import { Loop } from './Modelo/ObjetosAnalisis/Sentences/Function_Content/Loops_Sentences/Loop';
import { For } from './Modelo/ObjetosAnalisis/Sentences/Function_Content/Loops_Sentences/For';
import { While } from './Modelo/ObjetosAnalisis/Sentences/Function_Content/Loops_Sentences/While';

import { BreakPoint } from './Modelo/ObjetosAnalisis/Sentences/Function_Content/Only_Sentences/Breakpoints/BreakPoint';
import { Break } from './Modelo/ObjetosAnalisis/Sentences/Function_Content/Only_Sentences/Breakpoints/Break';
import { Continue } from './Modelo/ObjetosAnalisis/Sentences/Function_Content/Only_Sentences/Breakpoints/Continue';
import { Return } from './Modelo/ObjetosAnalisis/Sentences/Function_Content/Only_Sentences/Breakpoints/Return';

import { Dibujar } from './Modelo/ObjetosAnalisis/Sentences/Function_Content/Only_Sentences/Dibujar/Dibujar';
import { DibujarAST } from './Modelo/ObjetosAnalisis/Sentences/Function_Content/Only_Sentences/Dibujar/DibujarAST';
import { DibujarEXP } from './Modelo/ObjetosAnalisis/Sentences/Function_Content/Only_Sentences/Dibujar/DibujarEXP';
import { DibujarTS } from './Modelo/ObjetosAnalisis/Sentences/Function_Content/Only_Sentences/Dibujar/DIbujarTS';

import { Asignacion } from './Modelo/ObjetosAnalisis/Sentences/Function_Content/Only_Sentences/Asignacion';
import { Mostrar } from './Modelo/ObjetosAnalisis/Sentences/Function_Content/Only_Sentences/Mostrar';

import { Expresion } from './Modelo/ObjetosAnalisis/Sentences/Function_Content/Content/Expresion';
import { ContentType } from './Modelo/ObjetosAnalisis/Sentences/Class_Content/ContentType';
import { Invocacion } from './Modelo/ObjetosAnalisis/Sentences/Function_Content/Content/Invocacion';
import { Variable } from './Modelo/ObjetosAnalisis/Sentences/Function_Content/Content/Variable';
import { Result } from './Modelo/ObjetosAnalisis/Sentences/Function_Content/Content/Result';
import { OperationHandler } from './Modelo/ObjetosAnalisis/Sentences/Function_Content/Content/OperationHandler';
import { Operator } from './Modelo/ObjetosAnalisis/Sentences/Function_Content/Content/Operator';
import { OperatorType } from './Modelo/ObjetosAnalisis/Sentences/Function_Content/Content/OperatorType';
import { OperationResult } from './Modelo/ObjetosAnalisis/Sentences/Function_Content/Content/OperationResult';
import { AddResult } from './Modelo/ObjetosAnalisis/Sentences/Function_Content/Content/AddResult';

@NgModule({
  declarations: [
    AppComponent,    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GlobalContainerModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
