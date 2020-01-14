import React, { useEffect, useState, useRef } from "react";
import * as three from "three";

import * as styles from "../../styles";
import { useSimpleDrag } from "../hooks";
import { Tree } from "../../splyt";
import create from "./splyt";

export interface Props {
  size: { width: number; height: number };
  canvasRef?: (node: HTMLCanvasElement | null) => void;
  tree: Tree;
  style?: any;
  activePath: string | null;
}

interface Bounds {
  min: {
    x: number;
    y: number;
    z: number;
  };
  max: {
    x: number;
    y: number;
    z: number;
  };
}

const groupToBounds = (group: three.Group): Bounds => {
  const bounds = new three.Box3().setFromObject(group);
  return {
    min: {
      x: bounds.min.x,
      y: bounds.min.y,
      z: bounds.min.z
    },
    max: {
      x: bounds.max.x,
      y: bounds.max.y,
      z: bounds.max.z
    }
  };
};

const Splyt3dViewer: React.SFC<Props> = props => {
  const { size, canvasRef, tree, activePath, ...rest } = props;

  const containerEl = useRef(null);

  const { dragContainerAttrs, drag } = useSimpleDrag();

  const [scene] = useState<three.Scene>(createScene());

  const [camera] = useState<three.PerspectiveCamera>(
    (() => {
      const cam = new three.PerspectiveCamera(
        45,
        undefined, // Set subsequently in update
        10,
        10000
      );
      cam.up = new three.Vector3(0, -1, 0);
      cam.position.set(0, 300, 300);
      return cam;
    })()
  );

  const [renderer] = useState<three.Renderer>(
    (() => {
      const r = new three.WebGLRenderer({
        antialias: true,
        preserveDrawingBuffer: true
      });

      r.setClearColor(0xffffff, 1);
      r.shadowMap.enabled = true;
      return r;
    })()
  );

  const [objWithBounds, setObjWithBounds] = useState<[three.Group, Bounds] | undefined>(undefined);

  useEffect(() => {
    if (objWithBounds) {
      scene.remove(objWithBounds[0]);
    }
    const group = create(props.tree, {
      activePath: props.activePath
    });
    scene.add(group);
    setObjWithBounds([group, groupToBounds(group)]);
  }, [props.tree, props.activePath]);

  useEffect(() => {
    renderer.setSize(size.width, size.height);
    const maxAspect =
      size.width > size.height
        ? size.width / size.height
        : size.height / size.width;
    camera.aspect = size.width / size.height;
    if (!objWithBounds) {
      return;
    }
    const bounds = objWithBounds[1];
    const boundsMin = new three.Vector3(
      bounds.min.x,
      bounds.min.y,
      bounds.min.z
    );
    const boundsMax = new three.Vector3(
      bounds.max.x,
      bounds.max.y,
      bounds.max.z
    );
    const center = boundsMin
      .clone()
      .add(boundsMax)
      .multiplyScalar(0.5);
    const boundsDistance = boundsMin.distanceTo(boundsMax);
    const [cameraAngleXY, cameraAngleZ]: [number, number] = [
      drag[0] / 200,
      drag[1] / 200
    ];
    const cameraPosition = center
      .clone()
      .add(
        new three.Vector3(
          boundsDistance *
            maxAspect *
            Math.cos(cameraAngleZ) *
            Math.sin(cameraAngleXY),
          -boundsDistance * maxAspect * Math.sin(cameraAngleZ),
          boundsDistance *
            maxAspect *
            Math.cos(cameraAngleZ) *
            Math.cos(cameraAngleXY)
        )
      );
    camera.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z);
    camera.lookAt(center);
    camera.updateProjectionMatrix();
  }, [size, objWithBounds, drag]);

  const [appended, setAppended] = useState(false);

  useEffect(() => {
    if (!containerEl) {
      return;
    }
    const container = (containerEl.current as unknown) as HTMLElement;
    if (container && !appended) {
      console.log("appending");
      container.appendChild(renderer.domElement);
      if (canvasRef) {
        canvasRef(renderer.domElement);
      }
      setAppended(true);
    }
  }, [containerEl, canvasRef, appended, renderer]);

  useEffect(() => {
    if (!scene || !camera || !renderer) {
      return;
    }
    renderer.render(scene, camera);
  }, [objWithBounds, drag, renderer, size, scene, camera]);

  return (
    <div
      {...dragContainerAttrs}
      ref={containerEl}
      style={{ width: size.width, height: size.height }}
      {...rest}
    />
  );
};

const createScene = (): three.Scene => {
  /* Environment */

  const axisHelper = new three.AxesHelper(50);

  const planeGeometry = new three.CircleGeometry(50, 40);
  const planeMaterial = new three.MeshLambertMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 1,
    side: three.DoubleSide
  });

  const plane = new three.Mesh(planeGeometry, planeMaterial);
  plane.receiveShadow = true;
  plane.rotation.x = -Math.PI / 2;
  plane.position.set(0, 0, 0);

  /* Lights */

  const lights = (() => {
    const light1 = new three.DirectionalLight(styles.white, 0.2);
    light1.position.set(10, 10, 10);

    const light2 = new three.DirectionalLight(styles.white, 0.2);
    light2.position.set(-10, -10, -10);

    const light3 = new three.AmbientLight(styles.white);

    return [light1, light2, light3];
  })();

  /* Scene */

  const scene = new three.Scene();

  if (false && process.env.NODE_ENV === "development") {
    scene.add(axisHelper);
    scene.add(plane);
  }

  lights.forEach(light => {
    scene.add(light);
  });

  return scene;
};

export default Splyt3dViewer;
